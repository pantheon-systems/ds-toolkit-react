import { useState } from 'react';
import PropTypes from 'prop-types';

import './checkbox.css';

/**
 * Checkbox UI component
 */
const Checkbox = ({ id, label, checked, disabled }) => {
	const defaultChecked = checked ? checked : false;
	const [isChecked, setIsChecked] = useState(defaultChecked);

	const handleOnChange = () => {
		setIsChecked(!isChecked);
	};

	return (
		<div className='pds-checkbox'>
			<input
				type='checkbox'
				id={id}
				defaultChecked={isChecked}
				disabled={disabled}
				onChange={handleOnChange}
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
	 * Is the checkbox checked initially?
	 */
	checked: PropTypes.bool,
	/**
	 * Is the checkbox disabled?
	 */
	disabled: PropTypes.bool,
};

Checkbox.defaultProps = {
	checked: false,
	disabled: false,
};

export default Checkbox;
