import { useState } from 'react';
import PropTypes from 'prop-types';

import './radio-group.css';

/**
 * RadioGroup UI component
 */
const RadioGroup = ({ id, label, options, initialSelection, onChange }) => {
	//
	const [currentSelection, setCurrentSelection] = useState(initialSelection);

	//
	const handleSelection = (event) => {
		setCurrentSelection(event.target.value);

		//
		if (onChange) {
			onChange(event.target.value);
		}
	};

	//
	// Render the output
	return (
		<fieldset className='pds-radio-group' id={id}>
			<legend>{label}</legend>

			<div className='pds-radio-group__options'>
				{options.map((radio, idx) => {
					return (
						<label
							className='pds-radio-group__option'
							key={`${id}-option-${idx}`}
						>
							<input
								type='radio'
								name={id}
								value={radio.value}
								onClick={handleSelection}
								defaultChecked={currentSelection === radio.value ? true : false}
							/>
							{radio.label}
						</label>
					);
				})}
			</div>
		</fieldset>
	);
};

//
// Prop types

//
// Component propType definitions
RadioGroup.propTypes = {
	/**
	 * Unique ID for the radio group
	 */
	id: PropTypes.string.isRequired,
	/**
	 * Label for the radio group
	 */
	label: PropTypes.string.isRequired,
	/**
	 * Array of radio options
	 */
	options: PropTypes.arrayOf(
		PropTypes.shape({
			/**
			 * Option unique ID
			 */
			id: PropTypes.string.isRequired,
			/**
			 * Option label
			 */
			label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
			/**
			 * Option value
			 */
			value: PropTypes.string.isRequired,
		}),
	),
	/**
	 * Optional initial selected option value
	 */
	initialSelection: PropTypes.string,
	/**
	 * Callback function that will return the updated value from the instance when it changes.
	 * Function should have the shape of: `(value) => { <do stuff here> } `.
	 */
	onChange: PropTypes.func,
};

RadioGroup.defaultProps = {};

//
export default RadioGroup;
