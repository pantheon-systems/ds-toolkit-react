import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { cssClassesList, ClearButton } from '../__shared/inputs/inputs-core';
import '../__shared/inputs/inputs-core.css';
import './input-text.css';

import { SearchIcon } from './icons/icon-search';

// decorator definitions
const decoratorsList = {
	search: <SearchIcon className='pds-input-field__decorator' />,
};

/**
 * InputText UI component
 */
const InputText = ({
	label,
	placeholder,
	disabled,
	required,
	initialValue,
	message,
	counterFunction,
	validationFunction,
	textareaHeight,
	type,
	id,
	onChange,
}) => {
	// state
	const [value, setValue] = useState(initialValue);
	const [counter, setCounter] = useState(counterFunction(''));
	const [internalMessage, setInternalMessage] = useState();
	const [validationState, setValidationState] = useState(null);
	const cssClasses = useRef(['pds-input-field', 'pds-input-text']);

	const inputRef = useRef(null);

	//
	useEffect(() => {
		if (initialValue && counterFunction) {
			setCounter(counterFunction(initialValue));
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

	//
	const handleChangeInput = (e) => {
		setValue(e.target.value);

		resetInputState();

		// call counterFunction that was passed in and give it the current value
		if (counterFunction) {
			setCounter(counterFunction(e.target.value));
		}

		// call the onChange function that was passed in and give it the current value
		if (onChange) {
			onChange(value);
		}
	};

	const handleBlur = (e) => {
		// call validationFunction that was passed in and it the current value
		if (validationFunction) {
			const validationResult = validationFunction(e.target.value) || {};

			resetInputState();

			if (validationResult.error) {
				setValidationState('error');
				cssClasses.current.push(cssClassesList.error);
			}

			if (validationResult.success) {
				setValidationState('success');
				cssClasses.current.push(cssClassesList.success);
			}

			setInternalMessage(validationResult.message);
		}

		// call the onChange function that was passed in and give it the current value
		if (onChange) {
			onChange(value);
		}
	};

	const handleClearInput = (e) => {
		resetInputState();

		// clear value
		setValue('');

		// place focus back into input field after using the clear button
		inputRef.current.focus();

		// call counterFunction that was passed in and give it the current value
		if (counterFunction) {
			setCounter(counterFunction(''));
		}

		// call the onChange function that was passed in and give it the current value
		if (onChange) {
			onChange(value);
		}
	};

	// determine HTML tag to use based on tag
	let InputTag = `input`;
	if (type === 'textarea') {
		InputTag = `textarea`;

		if (!cssClasses.current.includes(cssClassesList.isTextarea)) {
			cssClasses.current.push(cssClassesList.isTextarea);
		}
	} else {
		cssClasses.current = cssClasses.current.filter(
			(i) => i !== cssClassesList.isTextarea,
		);
	}

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

	// decorator
	const decorator = decoratorsList[type];

	//
	// Render the output
	return (
		<div className={cssClasses.current.join(' ').trim()}>
			<label htmlFor={id}>{label}</label>

			<div className='pds-input-field__field-wrapper'>
				{decorator && (
					<div className='pds-input-field__decorators'>{decorator}</div>
				)}

				<InputTag
					className='pds-input-field__input'
					style={type === 'textarea' ? { height: textareaHeight } : null}
					type={type !== 'textarea' ? type : null}
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
				/>

				<div className='pds-input-field__accessories'>
					{counter && (
						<div className='pds-input-field__accessory pds-input-field__counter'>
							{counter}
						</div>
					)}

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
InputText.propTypes = {
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
	 * Type of input field to use.
	 */
	type: PropTypes.oneOf([
		'text',
		'search',
		'number',
		'email',
		'tel',
		'url',
		'textarea',
	]),

	/**
	 * Height value to be given to the textarea type.
	 */
	textareaHeight: PropTypes.string,

	/**
	 * If a counter is desired provide a function that accepts the input's value and will return a string to display.
	 * <br />
	 * Example: A function that counts characters up to a maximum of 20 will return "5/20" for an input value of "apple".
	 */
	counterFunction: PropTypes.func,
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
	 * Function to help lift the state and retrieve the input's value.
	 * <br />
	 * Should accept one argument, the input's value.
	 */
	onChange: PropTypes.func,
};

InputText.defaultProps = {
	type: 'text',
	counterFunction: () => {},
	initialValue: '',
};

//
export default InputText;
