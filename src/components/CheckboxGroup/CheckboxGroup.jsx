import { useState } from 'react';
import PropTypes from 'prop-types';
import Checkbox from '../Checkbox/Checkbox';

import './checkbox-group.css';

/**
 * CheckboxGroup UI component
 */
const CheckboxGroup = ({ id, label, options, onChange }) => {
	// Get array of values that are checked initially.
	const initialCheckedOptions = [];
	options.map((checkbox) => {
		if (checkbox.checked === true) {
			initialCheckedOptions.push(checkbox.value);
		}
	});

	const [checkedOptions, setCheckedOptions] = useState(initialCheckedOptions);

	const handleCheckedOptions = (event) => {
		let updatedOptions = [];

		// If event option is checked, add to array.
		if (event.target.checked === true) {
			updatedOptions = [...checkedOptions, event.target.value];
		}

		// If event option is unchecked, remove from array.
		if (event.target.checked === false) {
			updatedOptions = checkedOptions.filter(
				(value) => value !== event.target.value,
			);
		}

		setCheckedOptions(updatedOptions);

		if (onChange) {
			onChange(updatedOptions);
		}
	};

	return (
		<fieldset className='pds-checkbox-group' id={id}>
			<legend>{label}</legend>

			<div
				className='pds-checkbox-group__options'
				onChange={handleCheckedOptions}
			>
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
			 * Label of the checkbox.
			 */
			label: PropTypes.string.isRequired,
			/**
			 * Value attribute of the checkbox.
			 */
			value: PropTypes.string.isRequired,
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
	 * Callback function that will return the updated array of values from the instance when any of the options change.
	 * Function should have the shape of: `(values) => { <do stuff here> } `.
	 */
	onChange: PropTypes.func,
};

CheckboxGroup.defaultProps = {};

export default CheckboxGroup;
