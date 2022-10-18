import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { cssClassesList, ClearButton } from '../__shared/inputs/inputs-core';
import '../__shared/inputs/inputs-core.css';
import './input-formatted.css';

// retrieve localized group and decimal characters
const intlParts = new Intl.NumberFormat().formatToParts(1000000.89);
const groupChar = intlParts.find((part) => part.type === 'group').value;
const decimalChar = intlParts.find((part) => part.type === 'decimal').value;

const maxlengthCreditCard = 16;
const maxLengthPhoneUS = 10;

/**
 * InputFormatted UI component
 */
const InputFormatted = ({
	id,
	label,
	placeholder,
	disabled,
	required,
	initialValue,
	formatting,
	validationFunction,
	message,
	onChange,
}) => {
	const [value, setValue] = useState('');
	const [internalMessage, setInternalMessage] = useState(null);
	const [validationState, setValidationState] = useState(null);
	const cssClasses = useRef(['pds-input-field', 'pds-input-formatted']);

	const inputRef = useRef(null);
	const rawValue = useRef(null);

	// define maximum length of input for certain formats
	const maxlength = useRef('');

	//
	useEffect(() => {
		if (initialValue) {
			setValue(formatValue(initialValue));
		}

		maxlength.numExtra = '';

		switch (formatting) {
			case 'credit-card':
				maxlength.numExtra = 3;
				maxlength.current = maxlengthCreditCard;
				break;

			case 'phone-us':
				maxlength.numExtra = 4;
				maxlength.current = maxLengthPhoneUS;
				break;
		}
	}, []);

	//
	const removeStateClasses = () => {
		cssClasses.current = cssClasses.current.filter(
			(i) => i !== cssClassesList.required && i !== cssClassesList.disabled,
		);
	};

	const removeValidationStateClasses = () => {
		cssClasses.current = cssClasses.current.filter(
			(i) => i !== cssClassesList.error && i !== cssClassesList.success,
		);
	};

	const resetInputState = () => {
		removeValidationStateClasses();
		setInternalMessage('');
		setValidationState(null);
	};

	const onChangeHandler = () => {
		// call the onChange function that was passed in and give it an object containing current formatted and raw values
		if (onChange) {
			onChange({ formattedValue: value, rawValue: rawValue.current });
		}
	};

	//
	const handleChangeInput = (e) => {
		setValue(formatValue(e.target.value));

		resetInputState();

		onChangeHandler();
	};

	const hasError = () => {
		setValidationState('error');
		cssClasses.current.push(cssClassesList.error);
	};

	const handleBlur = (e) => {
		// call validationFunction that was passed in and it the current value
		if (validationFunction) {
			const validationResult = validationFunction(e.target.value) || {};

			resetInputState();

			if (validationResult.error) {
				hasError();
			}

			if (validationResult.success) {
				setValidationState('success');
				cssClasses.current.push(cssClassesList.success);
			}

			setInternalMessage(validationResult.message);
		} else {
			// Default validation included in component

			// validity failure
			if (
				inputRef.current.checkValidity() === false ||
				e.target.value.length < maxlength.current + maxlength.numExtra
			) {
				hasError();

				// Credit card number
				if (formatting === 'credit-card') {
					setInternalMessage(
						`Credit card number must have at least ${maxlength.current} digits.`,
					);
				}

				// Phone number (USA/CA)
				if (formatting === 'phone-us') {
					setInternalMessage(
						`Phone number must have at least ${maxlength.current} digits.`,
					);
				}
			}
		}

		onChangeHandler();
	};

	const handleClearInput = (e) => {
		resetInputState();

		// clear value
		setValue('');
		rawValue.current = '';

		// place focus back into input field after using the clear button
		inputRef.current.focus();

		onChangeHandler();
	};

	// Return the formatted value according to the formatting type provided
	const formatValue = (toFormat) => {
		if (toFormat) {
			// Credit card number
			if (formatting === 'credit-card') {
				const raw = ('' + toFormat).replace(/\D/g, '');
				rawValue.current = raw;

				if (raw) {
					// American Express
					const amexRegExp = new RegExp('^34|37', 'g');

					if (amexRegExp.test(raw)) {
						// override maxlength if we have an American Express card
						maxlength.numExtra = 2;
						maxlength.current = maxlengthCreditCard - 1;

						const amex = {};
						amex.first = raw.substring(0, 4);
						amex.middle = raw.substring(4, 10);
						if (amex.middle.length > 0) {
							amex.middle = ` ${amex.middle}`;
						}
						amex.last = raw.substring(10);
						if (amex.last.length > 0) {
							amex.last = ` ${amex.last}`;
						}

						return `${amex.first}${amex.middle}${amex.last}`;
					}

					// All other card types
					maxlength.numExtra = 3;
					maxlength.current = maxlengthCreditCard;

					const cardRegExp = new RegExp('.{1,4}', 'g');
					const numberParts = raw.match(cardRegExp);

					return numberParts.join(' ');
				}

				return raw;
			}

			// Phone number (USA/CA)
			if (formatting === 'phone-us') {
				const raw = ('' + toFormat).replace(/\D/g, '');
				rawValue.current = raw;

				if (raw) {
					maxlength.numExtra = 4;
					maxlength.current = maxLengthPhoneUS;

					let areaCode = raw.substring(0, 3);

					let prefix = raw.substring(3, 6);
					if (prefix.length > 0) {
						areaCode = `(${areaCode})`;
						prefix = ` ${prefix}`;
					}

					let line = raw.substring(6);
					if (line.length > 0) {
						line = `-${line}`;
					}

					return `${areaCode}${prefix}${line}`;
				}

				return raw;
			}

			// Localized number
			if (formatting === 'number-localized') {
				// remove any characters that are not a digit or a period
				const rawRegExp = new RegExp(`[^0-9${decimalChar}]`, 'g');
				const raw = ('' + toFormat).replace(rawRegExp, '');
				rawValue.current = raw;

				// setup to handle the maximum number of fraction digits in any locale
				const localizedNumber = new Intl.NumberFormat(undefined, {
					maximumFractionDigits: 20,
				}).format(raw);

				// avoid issues during typing and beginning to add fraction digits
				if (raw.endsWith(decimalChar)) {
					return localizedNumber + decimalChar;
				}

				return localizedNumber;
			}
		}

		return toFormat;
	};

	// reset state CSS
	removeStateClasses();

	// if required and not disabled
	if (required && !disabled) {
		cssClasses.current.push(cssClassesList.required);
	}

	// if disabled
	if (disabled) {
		cssClasses.current.push(cssClassesList.disabled);
	}

	//
	// Render the output
	return (
		<div className={cssClasses.current.join(' ').trim()}>
			<label htmlFor={id}>{label}</label>

			<div className='pds-input-field__field-wrapper'>
				<input
					className='pds-input-field__input'
					type={formatting === 'phone-us' ? 'tel' : 'text'}
					id={id}
					name={id}
					placeholder={placeholder}
					required={required}
					disabled={disabled}
					value={value}
					onChange={handleChangeInput}
					onBlur={handleBlur}
					ref={inputRef}
					aria-invalid={validationState === 'error' ? true : false}
					aria-describedby={
						message || internalMessage ? `${id}__message` : null
					}
					maxLength={maxlength.current + maxlength.numExtra}
					minLength={maxlength.current + maxlength.numExtra}
				/>

				<div className='pds-input-field__accessories'>
					{value && (
						<ClearButton
							id={id}
							label={label}
							handleClearInput={handleClearInput}
						/>
					)}
				</div>
			</div>

			{(message || internalMessage) && (
				<div
					className='pds-input-field__message'
					id={`${id}__message`}
					role={validationState === 'error' ? 'alert' : null}
				>
					{internalMessage || message}
				</div>
			)}
		</div>
	);
};

//
// Prop types

//
// Component propType definitions
InputFormatted.propTypes = {
	/**
	 * ID of the input.
	 * <br />
	 * Will be used to connect the label element, clear button, and set the name attribute of the input.
	 */
	id: PropTypes.string.isRequired,
	/**
	 * Text label associated with the input field.
	 */
	label: PropTypes.string.isRequired,
	/**
	 * Optional placeholder text to display when the input field is empty.
	 */
	placeholder: PropTypes.string,
	/**
	 * Is the field disabled?
	 */
	disabled: PropTypes.bool,
	/**
	 * Is the field required?
	 */
	required: PropTypes.bool,
	/**
	 * Initial value for the input field.
	 */
	initialValue: PropTypes.string,
	/**
	 * Type of formatting the field should use.
	 */
	formatting: PropTypes.oneOf(['credit-card', 'phone-us', 'number-localized'])
		.isRequired,

	/**
	 * If field validation is desired provide a function that accepts the input's value and will return one of the response objects below.
	 *
	 * Error:<br/>
	 * ```
	 * {
	 *   error: true,
	 *   message: [string],
	 * }
	 * ```
	 *
	 * Success:<br/>
	 * ```
	 * {
	 *   success: true,
	 *   message: [string]
	 * }
	 * ```
	 */
	validationFunction: PropTypes.func,
	/**
	 * Message to display to aid in clarifying the input field.
	 * Should be used rarely.
	 */
	message: PropTypes.string,

	/**
	 * Function to help lift the state and retrieve the input's values.
	 * <br />
	 * Should accept one argument, an object with keys of `formattedValue` and `rawValue`.
	 */
	onChange: PropTypes.func,
};

InputFormatted.defaultProps = {
	initialValue: '',
};

//
export default InputFormatted;
