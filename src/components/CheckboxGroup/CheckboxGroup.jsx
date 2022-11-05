import { useState } from 'react';
import PropTypes from 'prop-types';
import Checkbox from '../Checkbox/Checkbox';

import './checkbox-group.css';

/**
 * CheckboxGroup UI component
 */
const CheckboxGroup = ({ id, label, options, onChange }) => {
	return (
		<fieldset className='pds-checkbox-group' id={id}>
			<legend>{label}</legend>

			<div className='pds-checkbox-group__options'>
				{options.map((checkbox, index) => {
					return (
						<Checkbox
							key={index}
							id={`${id}-option-${index}`}
							label={checkbox.label}
							name={id}
							value={checkbox.value}
							checked={checkbox.checked}
							disabled={checkbox.disabled}
						/>
					);
				})}
			</div>
		</fieldset>
	);
};

CheckboxGroup.propTypes = {
	/**
	 * Unique ID for the checkbox group.
	 */
	id: PropTypes.string.isRequired,
	/**
	 * Label for the checkbox group.
	 */
	label: PropTypes.string.isRequired,
	/**
	 * Array of checkboxes.
	 */
	options: PropTypes.arrayOf(
		PropTypes.shape({
			/**
			 * Option unique ID
			 */
			id: PropTypes.string,
			/**
			 * Label of the checkbox.
			 */
			label: PropTypes.string.isRequired,
			/**
			 * Value attribute of the checkbox.
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
		}),
	),
	/**
	 * Callback function that will return updated values from the instance when it changes.
	 * Function should have the shape of: `(value) => { <do stuff here> } `.
	 */
	onChange: PropTypes.func,
};

CheckboxGroup.defaultProps = {};

export default CheckboxGroup;
