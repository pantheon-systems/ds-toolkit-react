import React from 'react';
import {
	MenuButtonProps,
	MenuButtonState,
	MenuItem as MenuItemType,
} from './Menu-button.types';
import './menu-button.css';

// Import additional components for composition
import Button from '../Button';

/**
 * Primary UI component for user interaction
 */
class MenuButton extends React.Component<MenuButtonProps, MenuButtonState> {
	// function to generate a short UUID
	createShortUUID = () => {
		return crypto.randomUUID().substring(0, 8);
	};

	// generate a short unique ID to add to ID attributes
	salt = this.createShortUUID();
	triggerID = `menu-button-${this.salt}`;
	listboxID = `menu-listbox-${this.salt}`;

	menuRef: any = undefined;
	nodeRef: any = undefined;

	state = {
		isOpen: false,
		focusMenu: false,
		activeDescendant: '',
		activeMenuItemIndex: 0,
		groupIDs: new Array(),
		menuItemIDs: new Array(),
	};

	constructor(props: MenuButtonProps) {
		super(props);

		// bind "this" correctly ahead of time
		this.handleTriggerClick = this.handleTriggerClick.bind(this);
		this.handleButtonKeyDown = this.handleButtonKeyDown.bind(this);
		this.handleFocusOut = this.handleFocusOut.bind(this);

		// setup the onClick outside handler
		window.addEventListener(
			'mousedown',
			this.handleClickOutside.bind(this),
			true,
		);
	}

	componentDidUpdate() {
		// only focus the menu when state instructs us to
		if (this.state.focusMenu) {
			// focus the menu element
			this.menuRef.focus();
			// reset state
			this.setState({
				focusMenu: false,
			});
		}
	}

	render(): React.ReactNode {
		const { label, icon, menuItems } = this.props;

		// build the button content based on icon position value if icon was provided
		const buttonContent: Array<string | HTMLElement | undefined> = [label];
		if (icon && icon.position === 'start') {
			buttonContent.unshift(icon.icon);
		}
		if (icon && icon.position === 'end') {
			buttonContent.push(icon.icon);
		}

		return (
			<span
				className='pds-menu-button'
				ref={(node) => {
					this.nodeRef = node;
				}}
			>
				<Button
					label={buttonContent}
					id={this.triggerID}
					type='button'
					className='pds-menu-button__trigger'
					aria-haspopup='true'
					aria-controls={this.listboxID}
					aria-expanded={this.state.isOpen}
					onClick={this.handleTriggerClick}
					onKeyDown={this.handleButtonKeyDown}
				/>
				{this.renderMenuItems(menuItems)}
			</span>
		);
	}

	//
	// Internal/support methods
	//

	// function to render each menu item correctly
	renderItem = (
		item: MenuItemType,
		index: number,
		groupID = '',
		groupHeadingID = '',
	) => {
		const groupIDString = groupID ? `-group-${groupID}` : '';
		const itemID = this.triggerID + groupIDString + '-item-' + (index + 1);

		// render a separator if found
		if (item.isSeparator) {
			return <li role='separator' key={itemID}></li>;
		}

		// render a heading if found
		if (item.isHeading) {
			return (
				<li
					role='presentation'
					id={groupHeadingID}
					key={groupHeadingID}
					className='pds-menu-button__listbox-heading'
				>
					{item.label}
				</li>
			);
		}

		// render a menu item if it has a label value
		if (item.label) {
			this.state.menuItemIDs.push(itemID);

			// decide if this item should be shown to have focus
			let shouldFocus = false;
			if (this.state.activeDescendant !== '') {
				shouldFocus = this.state.activeDescendant === itemID;
			}

			return (
				<li
					id={itemID}
					key={itemID}
					className={shouldFocus ? 'pds-menu-button__item-focused' : ''}
					role='menuitem'
				>
					{item.label}
				</li>
			);
		}
	};

	// Function to render grouped items
	renderMenuItemsGrouped = (
		items: Array<MenuItemType>,
		menuItemBreaks: Array<MenuItemType>,
	) => {
		const groupedItems = new Array();

		// get the first break item
		let breakItem = menuItemBreaks.shift();

		// setup our temporary storage for this group
		let group: Array<MenuItemType> = new Array();

		// iterate over all menu items
		items.map((item, index: number) => {
			// if the item isn't the first break item then add it to the group
			if (item !== breakItem) {
				group.push(item);

				// if this is the last item then add it to the group
				if (index + 1 === items.length) {
					groupedItems.push(group);
				}
			} else {
				// if we have a break item then add the group to the overall items data,
				// reset the temporary group storage,
				// add the break item to the new group,
				// get the next break item
				groupedItems.push(group);
				group = new Array();
				group.push(item);
				breakItem = menuItemBreaks.shift();
			}
		});

		// filter out empty groups
		return groupedItems.filter((group) => group.length > 0);
	};

	// Function to render the items
	renderMenuItems = (items: Array<MenuItemType>) => {
		// Chunk menu items into groups if needed
		const itemsData = items;
		// check if we have any separators or headings in the dataset
		const menuItemBreaks = items.filter((item: MenuItemType) => {
			return item.isHeading || item.isSeparator;
		});
		const haveBreaks = menuItemBreaks.length > 0;

		// if we have breaks then split into groups at each marker
		if (haveBreaks) {
			// group the items together
			const groupedItemsData: Array<Array<MenuItemType>> =
				this.renderMenuItemsGrouped(items, menuItemBreaks);

			// setup group IDs
			groupedItemsData.forEach(() => {
				this.state.groupIDs.push(this.createShortUUID());
			});
			let currentGroupID = this.state.groupIDs[0];

			// locate first valid item to properly set initial value for aria-activedescendant on menu/listbox
			const firstMenuItemIndex = groupedItemsData[0].findIndex(
				(item: MenuItemType) => !item.isSeparator && !item.isHeading,
			);

			// set active descendant ID value in component state
			const initialDescendant = `${
				this.triggerID
			}-group-${currentGroupID}-item-${firstMenuItemIndex + 1}`;

			// Render grouped items in listbox
			return (
				<div
					id={this.listboxID}
					role='menu'
					tabIndex={-1}
					aria-labelledby={this.triggerID}
					aria-activedescendant={
						this.state.activeDescendant !== ''
							? this.state.activeDescendant
							: initialDescendant
					}
					style={this.state.isOpen ? { display: 'block' } : { display: 'none' }}
					onBlur={this.handleFocusOut}
					ref={(menuElem) => (this.menuRef = menuElem)}
				>
					{groupedItemsData.map((group: Array<MenuItemType>, index: number) => {
						currentGroupID = this.state.groupIDs[index];
						const hasHeading = group[0].isHeading;
						const groupHeadingID = hasHeading
							? `${this.triggerID}-group-${currentGroupID}-heading`
							: '';
						const keyID = `${this.triggerID}-group-${currentGroupID}`;
						const groupLabel = hasHeading ? '' : `Unlabeled group ${index + 1}`; // TODO convert to translatable string

						return (
							<ul
								role='group'
								aria-labelledby={groupHeadingID}
								aria-label={groupLabel}
								key={keyID}
							>
								{group.map((item: MenuItemType, index: number) => {
									return this.renderItem(
										item,
										index,
										currentGroupID,
										groupHeadingID,
									);
								})}
							</ul>
						);
					})}
				</div>
			);
		} else {
			// Render plain listbox without any groups

			// set initial active descendant ID value
			const initialDescendant = `${this.triggerID}-item-1`;

			return (
				<ul
					id={this.listboxID}
					role='menu'
					tabIndex={-1}
					aria-labelledby={this.triggerID}
					aria-activedescendant={
						this.state.activeDescendant !== ''
							? this.state.activeDescendant
							: initialDescendant
					}
					style={this.state.isOpen ? { display: 'block' } : { display: 'none' }}
					onBlur={this.handleFocusOut}
					ref={(menuElem) => (this.menuRef = menuElem)}
				>
					{itemsData.map((item: MenuItemType, index: number) => {
						return this.renderItem(item, index);
					})}
				</ul>
			);
		}
	};

	//
	//

	setActiveMenuItem = (elemID: string, index: number) => {
		this.setState({
			activeDescendant: elemID,
			activeMenuItemIndex: index,
		});
	};

	setOpenState = (value: boolean) => {
		this.setState({
			isOpen: value,
		});
	};

	//
	// Event handler functions
	//
	handleTriggerClick = (event: React.MouseEvent) => {
		this.setState((prevState) => {
			return {
				isOpen: !prevState.isOpen,
				focusMenu: !prevState.isOpen,
			};
		});

		event.stopPropagation();
		event.preventDefault();
	};

	handleButtonKeyDown = (event: React.KeyboardEvent) => {
		var key = event.key,
			flag = false;

		switch (key) {
			// open menu and focus on first menu item
			case ' ':
			case 'Enter':
			case 'ArrowDown':
			case 'Down':
				this.setOpenState(true);
				this.setActiveMenuItem(this.state.menuItemIDs[0], 0);
				flag = true;
				this.setState({ focusMenu: true });
				break;

			// close menu
			case 'Esc':
			case 'Escape':
				this.setOpenState(false);
				flag = true;
				break;

			// open menu and focus on last menu item
			case 'Up':
			case 'ArrowUp':
				const lastIndex = this.state.menuItemIDs.length - 1;
				this.setOpenState(true);
				this.setState({ focusMenu: true });
				this.setActiveMenuItem(this.state.menuItemIDs[lastIndex], lastIndex);
				flag = true;
				break;

			// do nothing
			default:
				break;
		}

		// if something desired happened prevent default behavior
		if (flag) {
			event.stopPropagation();
			event.preventDefault();
		}
	};

	handleFocusOut = () => {
		this.setState({
			isOpen: false,
			focusMenu: false,
		});
	};

	// Handle click outside event to close menu if open
	handleClickOutside = (event: MouseEvent) => {
		if (!this.nodeRef.contains(event.target)) {
			if (this.state.isOpen) {
				this.setOpenState(false);
			}
		}
	};
}

//
export default MenuButton;
