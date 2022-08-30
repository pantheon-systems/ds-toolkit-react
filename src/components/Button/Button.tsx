import React, { FC } from 'react';
import { ButtonProps } from './Button.types';
import './button.css';

/**
 * Primary UI component for user interaction
 */
const Button: FC<ButtonProps> = ({
	variant = 'secondary',
	label,
	disabled = false,
	onClick,
}) => {
	const mode = `pds-button--${variant}`;

	return (
		<button
			type='button'
			className={['pds-button', mode].join(' ')}
			disabled={disabled}
			onClick={onClick}
		>
			{label}
		</button>
	);
};

export default Button;
