import { forwardRef } from 'react';
import PropTypes from 'prop-types';

import './button.css';

/**0
 * Button UI component
 */
const Button = forwardRef(
	({ variant, label, disabled, type, onClick, className, ...props }, ref) => {
		const variantClass = `pds-button--${variant}`;

		return (
			<button
				{...props}
				type={type}
				className={['pds-button', variantClass, className].join(' ').trim()}
				disabled={disabled}
				onClick={onClick}
				ref={ref}
			>
				{label}
			</button>
		);
	},
);

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
	disabled: PropTypes.bool,
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
