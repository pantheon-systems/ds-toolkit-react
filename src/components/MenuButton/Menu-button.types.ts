import { MouseEventHandler } from 'react';

type MenuButton = {
	/**
	 * (optional) The text of the button/trigger
	 */
	label?: string;
	/**
	 * (optional) The icon element to render in the button/trigger and its location (start or end)
	 */
	icon?: MenuTriggerIcon;
	/**
	 * Array of menu items
	 */
	menuItems: Array<MenuItem>;
};

export type MenuButtonProps = RequireAtLeastOne<MenuButton, 'label' | 'icon'>;

type RequireAtLeastOne<T, R extends keyof T = keyof T> = Omit<T, R> &
	{ [P in R]: Required<Pick<T, P>> & Partial<Omit<T, P>> }[R];

export type MenuItem = {
	/**
	 * Label for a menu item
	 */
	label: string;
	/**
	 * (optional) Is the item a heading?
	 */
	isHeading?: true;
	/**
	 * (optional) Is the item a separator?
	 */
	isSeparator?: true;
	/**
	 * (optional) URL/HREF this menu item should navigate to
	 */
	href?: string;
	/**
	 * (optional) Callback function to execute when menu item is clicked/tapped/activated
	 */
	callback?: MouseEventHandler<HTMLLIElement>;
};

type MenuTriggerIcon = {
	position: 'start' | 'end';
	icon: HTMLElement;
};
