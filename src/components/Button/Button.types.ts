import { MouseEventHandler } from 'react';

export interface ButtonProps {
	/**
	 * Which variant of button to render
	 */
	variant: 'primary' | 'secondary' | 'tertiary' | 'destructive';
	/**
	 * The text of the button
	 */
	label: string;
	/**
	 * Is the button disabled?
	 */
	disabled: boolean;
	onClick: MouseEventHandler<HTMLButtonElement>;
}
