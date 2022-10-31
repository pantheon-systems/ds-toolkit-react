import PropTypes from 'prop-types';

import './checkbox.css';

/**
 * Checkbox UI component
 */
const Checkbox = ({ size, id, name, value, label, disabled, ...props }) => {
	const sizeClass = size === 'medium' ? undefined : `pds-checkbox--${size}`;

	return (
		<div className={['pds-checkbox', sizeClass].join(' ').trim()}>
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
	 * Checkbox size.
	 */
	size: PropTypes.oneOf(['small', 'medium', 'large']),
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
	size: 'medium',
	disabled: false,
};

export default Checkbox;
