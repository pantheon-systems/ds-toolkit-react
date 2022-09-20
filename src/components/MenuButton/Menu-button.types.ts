interface MenuButtonBase {
	/**
	 * Array of menu items
	 */
	menuItems: Array<AllItemTypes>;
}

interface MenuButtonLabelOnly extends MenuButtonBase {
	/**
	 * The text of the button/trigger
	 */
	label: string;
	// No icon should exist if only label is provided
	icon?: never;
}

interface MenuButtonIconOnly extends MenuButtonBase {
	// No label should exist if only icon is provided
	label?: never;
	/**
	 * The icon element to render in the button/trigger and its location (start or end)
	 */
	icon: MenuTriggerIcon;
}

interface MenuButtonLabelAndIcon extends MenuButtonBase {
	/**
	 * The text of the button/trigger
	 */
	label: string;
	/**
	 * The icon element to render in the button/trigger and its location (start or end)
	 */
	icon: MenuTriggerIcon;
}

export type MenuButtonProps =
	| MenuButtonLabelOnly
	| MenuButtonIconOnly
	| MenuButtonLabelAndIcon;

// type MenuButton = {
// 	/**
// 	 * The text of the button/trigger
// 	 */
// 	label: string;
// 	/**
// 	 * The icon element to render in the button/trigger and its location (start or end)
// 	 */
// 	icon: MenuTriggerIcon;
// 	/**
// 	 * Array of menu items
// 	 */
// 	menuItems: Array<AllItemTypes>;
// };
//
// export type MenuButtonProps = RequireAtLeastOne<MenuButton, 'label' | 'icon'>;
//
// type RequireAtLeastOne<T, R extends keyof T = keyof T> = Omit<T, R> &
// 	{ [P in R]: Required<Pick<T, P>> & Partial<Omit<T, P>> }[R];

export type AllItemTypes = MenuItem | HeadingItem | SeparatorItem;

export type MenuItem = {
	/**
	 * Label for a menu item
	 */
	label: string;
	/**
	 * (optional) URL/HREF this menu item should navigate to
	 */
	href?: string;
	/**
	 * (optional) Callback function to execute when menu item is clicked/tapped/activated
	 */
	callback?: Function;
};

export type HeadingItem = {
	/**
	 * Label for a menu item
	 */
	label: string;
	/**
	 * Is the item a heading?
	 */
	isHeading: boolean;
};

export type SeparatorItem = {
	/**
	 * Is the item a separator?
	 */
	isSeparator: boolean;
};

export enum ICON_POSITION {
	START = 'start',
	END = 'end',
}

type MenuTriggerIcon = {
	position: ICON_POSITION;
	icon: ReactElement;
};
