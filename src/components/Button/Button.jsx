import PropTypes from 'prop-types';

import './button.css';

/**0
 * Primary UI component for user interaction
 */
const Button = ({
	variant,
	label,
	disabled,
	type,
	onClick,
	className,
	...args
}) => {
	const variantClass = `pds-button--${variant}`;

	return (
		<button
			{...args}
			type={type}
			className={['pds-button', variantClass, className].join(' ').trim()}
			disabled={disabled}
			onClick={onClick}
		>
			{label}
		</button>
	);
};

Button.propTypes = {
	/**
	 * Which variant of button to render
	 */
	variant: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'critical']),
	/**
	 * The text of the button
	 */
	label: PropTypes.node.isRequired,
	/**
	 * Is the button disabled?
	 */
	disabled: PropTypes.oneOf([true, false]),
	/**
	 * Type of button
	 */
	type: PropTypes.oneOf(['button', 'submit', 'reset']),
	/**
	 * Click event handler callback
	 */
	onClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
	variant: 'secondary',
	type: 'button',
	disabled: false,
};

export default Button;
