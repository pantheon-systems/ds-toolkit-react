import PropTypes from 'prop-types';

import './checkbox.css';

/**
 * Checkbox UI component
 */
const Checkbox = ({ id, name, value, label, disabled }) => {
	return (
		<div className='pds-checkbox'>
			<input
				type='checkbox'
				id={id}
				name={name ? name : id}
				{...(value ? { value: value } : {})}
			/>
			<label for={id}>{label}</label>
		</div>
	);
};

Checkbox.propTypes = {
	/**
	 * Id of the checkbox.
	 */
	id: PropTypes.string.isRequired,
	/**
	 * Name attribute of the checkbox — will use `id` value if undefined.
	 */
	name: PropTypes.string,
	/**
	 * Value attribute of the checkbox.
	 */
	value: PropTypes.string,
	/**
	 * Label of the checkbox.
	 */
	label: PropTypes.string,
	/**
	 * Is the checkbox disabled?
	 */
	disabled: PropTypes.bool,
};

Checkbox.defaultProps = {
	disabled: false,
};

export default Checkbox;
