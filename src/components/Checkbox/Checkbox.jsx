import { useState } from 'react';
import PropTypes from 'prop-types';

import './checkbox.css';

/**
 * Checkbox UI component
 */
const Checkbox = ({ id, label, value, checked, disabled, onChange }) => {
	//
	const [isChecked, setIsChecked] = useState(checked);

	const handleOnClick = (event) => {
		setIsChecked(!isChecked);

		if (onChange) {
			onChange(event.target);
		}
	};

	return (
		<div className='pds-checkbox'>
			<input
				type='checkbox'
				id={id}
				{...(value ? { value: value } : {})}
				defaultChecked={isChecked}
				disabled={disabled}
				onClick={handleOnClick}
			/>
			<label htmlFor={id}>{label}</label>
		</div>
	);
};

Checkbox.propTypes = {
	/**
	 * Id of the checkbox.
	 */
	id: PropTypes.string.isRequired,
	/**
	 * Label of the checkbox.
	 */
	label: PropTypes.string.isRequired,
	/**
	 * Value attribute of the checkbox. Not required for single boolean checkboxes.
	 */
	value: PropTypes.string,
	/**
	 * Is the checkbox checked initially?
	 */
	checked: PropTypes.bool,
	/**
	 * Is the checkbox disabled?
	 */
	disabled: PropTypes.bool,
	/**
	 * Callback function that will return the updated properties from the checkbox when it changes.
	 * Function should have the shape of: `(checkbox) => { <do stuff here> } `.
	 */
	onChange: PropTypes.func,
};

Checkbox.defaultProps = {
	checked: false,
	disabled: false,
};

export default Checkbox;
