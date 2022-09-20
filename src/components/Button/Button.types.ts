import { MouseEventHandler, KeyboardEventHandler } from 'react';

export type ButtonProps = {
	/**
	 * Which variant of button to render
	 */
	variant?: 'primary' | 'secondary' | 'tertiary' | 'critical';
	/**
	 * The text of the button
	 */
	label: string | Array<any>;
	/**
	 * Is the button disabled?
	 */
	disabled?: boolean;
	/**
	 * Type of button
	 */
	type: 'button' | 'submit' | 'reset';
	/**
	 * (optional) Additional CSS classes
	 */
	className?: string;
	/**
	 * (optional) ID attribute
	 */
	id?: string;
	/**
	 * Click event handler callback
	 */
	onClick: MouseEventHandler<HTMLButtonElement>;
	/**
	 * (optional) Key down event handler callback
	 */
	onKeyDown?: KeyboardEventHandler<HTMLButtonElement>;
};
