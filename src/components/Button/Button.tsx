import { FC } from 'react';
import { ButtonProps } from './Button.types';
import './button.css';

/**
 * Primary UI component for user interaction
 */
const Button: FC<ButtonProps> = ({
	variant = 'secondary',
	label,
	disabled = false,
	type = 'button',
	onClick,
	className,
	...args
}) => {
	const variantClass = `pds-button--${variant}`;

	return (
		<button
			{...args}
			type={type}
			className={['pds-button', variantClass, className].join(' ')}
			disabled={disabled}
			onClick={onClick}
		>
			{label}
		</button>
	);
};

export default Button;
