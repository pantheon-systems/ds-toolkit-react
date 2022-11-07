import { useState } from 'react';
import PropTypes from 'prop-types';
import Checkbox from '../Checkbox/Checkbox';

import './checkbox-group.css';

/**
 * CheckboxGroup UI component
 */
const CheckboxGroup = ({ id, label, options }) => {
	// Get array of values that are checked initially.
	const initialCheckedOptions = [];
	options.map((checkbox) => {
		if (checkbox.checked === true) {
			initialCheckedOptions.push(checkbox.value);
		}
	});

	const [checkedOptions, setCheckedOptions] = useState(initialCheckedOptions);

	const handleCheckedOptions = (event) => {
		// If option is checked, add to checkedOptions.
		if (event.target.checked === true) {
			setCheckedOptions((checkedOptions) => [
				...checkedOptions,
				event.target.value,
			]);
		}
		// If option is unchecked, remove from checkedOptions.
		if (event.target.checked === false) {
			setCheckedOptions((checkedOptions) =>
				checkedOptions.filter((value) => value !== event.target.value),
			);
		}
	};

	return (
		<fieldset className='pds-checkbox-group' id={id}>
			<legend>{label}</legend>

			<div
				className='pds-checkbox-group__options'
				onClick={handleCheckedOptions}
				{...(checkedOptions.length !== 0 ? { values: checkedOptions } : {})}
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
};

CheckboxGroup.defaultProps = {};

export default CheckboxGroup;
