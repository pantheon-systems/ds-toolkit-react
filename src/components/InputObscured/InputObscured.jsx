import { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import '../__shared/inputs/inputs-core.css';
import './input-obscured.css';

import { ClearIcon } from './icons/icon-clear';
import { EyeIcon, EyeSlashIcon } from './icons/icon-eye';

const cssClassesList = {
	error: 'pds-has-error',
	success: 'pds-has-success',
	required: 'pds-is-required',
	disabled: 'pds-is-disabled',
};

/**
 * InputObscured UI component
 */
const InputObscured = ({
	id,
	label,
	required,
	disabled,
	message,
	counterFunction,
	validationFunction,
	onChange,
}) => {
	// state
	const [value, setValue] = useState();
	const [counter, setCounter] = useState(counterFunction(''));
	const [internalMessage, setInternalMessage] = useState();
	const [validationState, setValidationState] = useState(null);
	const [visibility, setVisibility] = useState(false);
	const cssClasses = useRef(['pds-input-field', 'pds-input-obscured']);

	const nodeRef = useRef(null);
	const inputRef = useRef(null);

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
		// always reset to hidden when leaving input
		setVisibility(false);

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
		inputRef.current.value = null;

		// place focus back into input field after using the clear button
		inputRef.current.focus();

		// call counterFunction that was passed in and give it the current value
		if (counterFunction) {
			setCounter(counterFunction(inputRef.current.value));
		}

		// call the onChange function that was passed in and give it the current value
		if (onChange) {
			onChange(value);
		}
	};

	const handleToggle = (e) => {
		setVisibility((previous) => {
			return !previous;
		});
	};

	// Handle blur outside event to set visibility to false when leaving field
	const handleBlurOutside = (e) => {
		if (!nodeRef.current?.contains(e.relatedTarget) || !e.relatedTarget) {
			setVisibility(false);
		}
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
		<div
			className={cssClasses.current.join(' ').trim()}
			ref={nodeRef}
			onBlur={handleBlurOutside}
		>
			<label htmlFor={id}>{label}</label>

			<div
				className='pds-input-obscured__aria-live'
				aria-live='polite'
			>{`Content of ${label} input is ${
				visibility ? 'visible' : 'hidden'
			}.`}</div>

			<div className='pds-input-field__field-wrapper'>
				<input
					className='pds-input-field__input'
					type={visibility ? 'text' : 'password'}
					id={id}
					name={id}
					required={required}
					disabled={disabled}
					onChange={handleChangeInput}
					onBlur={handleBlur}
					ref={inputRef}
					aria-invalid={validationState === 'error' ? true : false}
					aria-describedby={
						message || internalMessage ? `${id}__message` : null
					}
					autoComplete='off'
				/>

				<div className='pds-input-field__accessories'>
					{counter && <div className='pds-input-field_counter'>{counter}</div>}

					{value && (
						<button
							type='button'
							className='pds-input-field__accessory pds-input-field__clear'
							title={`Clear ${label} input`}
							aria-controls={id}
							onClick={handleClearInput}
						>
							<ClearIcon />
						</button>
					)}

					<button
						type='button'
						className='pds-input-field__accessory pds-input-obscured__toggle'
						title={`${visibility ? 'Hide' : 'Show'} content of ${label} input`}
						aria-controls={id}
						onClick={handleToggle}
						onMouseDown={(e) => e.preventDefault()}
					>
						{visibility ? <EyeSlashIcon /> : <EyeIcon />}
					</button>
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
InputObscured.propTypes = {
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
	 * Is the field disabled?
	 */
	disabled: PropTypes.bool,
	/**
	 * Is the field required?
	 */
	required: PropTypes.bool,
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

InputObscured.defaultProps = {
	counterFunction: () => {},
};

//
export default InputObscured;
