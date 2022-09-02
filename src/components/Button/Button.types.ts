import { MouseEventHandler } from 'react';

export interface ButtonProps {
	/**
	 * Which variant of button to render
	 */
	variant: 'primary' | 'secondary' | 'tertiary' | 'critical';
	/**
	 * The text of the button
	 */
	label: string;
	/**
	 * Is the button disabled?
	 */
	disabled: boolean;
	/**
	 * Type of button
	 */
	type: 'button' | 'submit' | 'reset';
	onClick: MouseEventHandler<HTMLButtonElement>;
}
