import { FC, useState, useEffect, useRef } from 'react';
import { MenuButtonProps, MenuItem as MenuItemType } from './Menu-button.types';
import './menu-button.css';

// Import additional components for composition
import Button from '../Button';

// function to generate a short UUID
const createShortUUID = () => {
	return crypto.randomUUID().substring(0, 8);
};

/**
 * Primary UI component for user interaction
 */
const MenuButton: FC<MenuButtonProps> = ({ label, icon, menuItems }) => {
	// generate a short unique ID to add to ID attributes
	const salt = createShortUUID();
	const [triggerID] = useState(`menu-button-${salt}`);
	const [listboxID] = useState(`menu-listbox-${salt}`);

	const menuRefDiv = useRef<HTMLDivElement>(null);
	const menuRefUL = useRef<HTMLUListElement>(null);
	const nodeRef = useRef<HTMLSpanElement>(null);

	const [isOpen, setIsOpen] = useState(false);
	const [focusMenu, setFocusMenu] = useState(false);
	const [activeDescendant, setActiveDescendant] = useState('');
	const [activeMenuItemIndex, setActiveMenuItemIndex] = useState(0);

	// Non-state instance trackers
	const groupIDs = useRef(new Array());
	const menuItemIDs = useRef(new Array());

	useEffect(() => {
		// setup the onClick outside handler
		window.addEventListener('mousedown', handleClickOutside, true);

		// only focus the menu when state instructs us to
		if (focusMenu) {
			// focus the menu element
			const menuRef = menuRefDiv.current
				? menuRefDiv.current
				: menuRefUL.current;
			if (menuRef) menuRef.focus();
			// reset state
			setFocusMenu(false);
		}
	});

	//
	// Internal/support methods
	//

	//
	//

	const setActiveMenuItem = (elemID: string, index: number) => {
		setActiveDescendant(elemID);
		setActiveMenuItemIndex(index);
	};

	const setOpenState = (value: boolean) => {
		setIsOpen(value);
	};

	//
	// Event handler functions
	//
	const handleTriggerClick = (event: React.MouseEvent) => {
		setIsOpen((prevState) => {
			return !prevState;
		});

		setFocusMenu((prevState) => {
			return !prevState;
		});

		setActiveMenuItem(menuItemIDs.current[0], 0);

		event.stopPropagation();
		event.preventDefault();
	};

	const handleButtonKeyDown = (event: React.KeyboardEvent) => {
		var key = event.key,
			flag = false;

		switch (key) {
			// open menu and focus on first menu item
			case ' ':
			case 'Enter':
			case 'ArrowDown':
			case 'Down':
				setOpenState(true);
				setActiveMenuItem(menuItemIDs.current[0], 0);
				flag = true;
				setFocusMenu(true);
				break;

			// close menu
			case 'Esc':
			case 'Escape':
				setOpenState(false);
				flag = true;
				break;

			// open menu and focus on last menu item
			case 'Up':
			case 'ArrowUp':
				const lastIndex = menuItemIDs.current.length - 1;
				setOpenState(true);
				setFocusMenu(true);
				setActiveMenuItem(menuItemIDs.current[lastIndex], lastIndex);
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

	const handleMenuKeydown = (event: React.KeyboardEvent) => {
		let key = event.key,
			flag = false,
			moveToItemID = '',
			moveToIndex = 0;

		function isPrintableCharacter(str: string) {
			return str.length === 1 && str.match(/\S/);
		}

		if (event.ctrlKey || event.altKey || event.metaKey) {
			return;
		}

		if (event.shiftKey) {
			if (isPrintableCharacter(key)) {
				{
					/* this.setFocusByFirstCharacter(key); */
				}
				flag = true;
			}

			if (event.key === 'Tab') {
				setOpenState(false);
				flag = true;
			}
		} else {
			switch (key) {
				case ' ':
				case 'Enter':
					setOpenState(false);
					{
						/* this.performMenuAction(this.currentMenuitem); */
					}
					flag = true;
					break;

				case 'Esc':
				case 'Escape':
					setOpenState(false);
					flag = true;
					break;

				case 'Up':
				case 'ArrowUp':
					{
						/* setFocusToPreviousMenuitem(); */
					}
					moveToIndex = activeMenuItemIndex - 1;
					if (moveToIndex < 0) {
						moveToIndex = menuItemIDs.current.length - 1;
					}
					moveToItemID = menuItemIDs.current[moveToIndex];
					setActiveMenuItem(moveToItemID, moveToIndex);
					flag = true;
					break;

				case 'ArrowDown':
				case 'Down':
					{
						/* setFocusToNextMenuitem(); */
					}
					moveToIndex = activeMenuItemIndex + 1;
					if (moveToIndex > menuItemIDs.current.length - 1) {
						moveToIndex = 0;
					}
					moveToItemID = menuItemIDs.current[moveToIndex];
					setActiveMenuItem(moveToItemID, moveToIndex);
					flag = true;
					break;

				case 'Home':
				case 'PageUp':
					{
						/* setFocusToFirstMenuitem(); */
					}
					setActiveMenuItem(menuItemIDs.current[0], 0);
					flag = true;
					break;

				case 'End':
				case 'PageDown':
					{
						/* setFocusToLastMenuitem(); */
					}
					const lastIndex = menuItemIDs.current.length - 1;
					setActiveMenuItem(menuItemIDs.current[lastIndex], lastIndex);
					flag = true;
					break;

				case 'Tab':
					setOpenState(false);
					break;

				default:
					if (isPrintableCharacter(key)) {
						{
							/* this.setFocusByFirstCharacter(key); */
						}
						flag = true;
					}
					break;
			}
		}

		if (flag) {
			event.stopPropagation();
			event.preventDefault();
		}
	};

	const handleFocusOut = () => {
		setIsOpen(false);
		setFocusMenu(false);
	};

	// Handle click outside event to close menu if open
	const handleClickOutside = (event: MouseEvent) => {
		if (nodeRef.current && !nodeRef.current.contains(event.target as Node)) {
			if (isOpen) {
				setOpenState(false);
			}
		}

		event.stopPropagation();
		event.preventDefault();
	};

	//
	//

	// function to render each menu item correctly
	const renderItem = (
		item: MenuItemType,
		index: number,
		groupID = '',
		groupHeadingID = '',
	) => {
		const groupIDString = groupID ? `-group-${groupID}` : '';
		const itemID = triggerID + groupIDString + '-item-' + (index + 1);

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
			menuItemIDs.current.push(itemID);

			// decide if this item should be shown to have focus
			let shouldFocus = false;
			if (activeDescendant !== '') {
				shouldFocus = activeDescendant === itemID;
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
	const renderMenuItemsGrouped = (
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
	const renderMenuItems = (items: Array<MenuItemType>) => {
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
				renderMenuItemsGrouped(items, menuItemBreaks);

			// setup group IDs
			groupedItemsData.forEach(() => {
				groupIDs.current.push(createShortUUID());
			});
			let currentGroupID = groupIDs.current[0];

			// locate first valid item to properly set initial value for aria-activedescendant on menu/listbox
			const firstMenuItemIndex = groupedItemsData[0].findIndex(
				(item: MenuItemType) => !item.isSeparator && !item.isHeading,
			);

			// set active descendant ID value in component state
			const initialDescendant = `${triggerID}-group-${currentGroupID}-item-${
				firstMenuItemIndex + 1
			}`;

			// Render grouped items in listbox
			return (
				<div
					id={listboxID}
					role='menu'
					tabIndex={-1}
					aria-labelledby={triggerID}
					aria-activedescendant={
						activeDescendant !== '' ? activeDescendant : initialDescendant
					}
					style={isOpen ? { display: 'block' } : { display: 'none' }}
					onKeyDown={handleMenuKeydown}
					onBlur={handleFocusOut}
					ref={menuRefDiv}
				>
					{groupedItemsData.map((group: Array<MenuItemType>, index: number) => {
						currentGroupID = groupIDs.current[index];
						const hasHeading = group[0].isHeading;
						const groupHeadingID = hasHeading
							? `${triggerID}-group-${currentGroupID}-heading`
							: '';
						const keyID = `${triggerID}-group-${currentGroupID}`;

						// TODO convert next line to translatable string
						const groupLabel = hasHeading ? '' : `Unlabeled group ${index + 1}`;

						return (
							<ul
								role='group'
								aria-labelledby={groupHeadingID}
								aria-label={groupLabel}
								key={keyID}
							>
								{group.map((item: MenuItemType, index: number) => {
									return renderItem(
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
			const initialDescendant = `${triggerID}-item-1`;

			return (
				<ul
					id={listboxID}
					role='menu'
					tabIndex={-1}
					aria-labelledby={triggerID}
					aria-activedescendant={
						activeDescendant !== '' ? activeDescendant : initialDescendant
					}
					style={isOpen ? { display: 'block' } : { display: 'none' }}
					onKeyDown={handleMenuKeydown}
					onBlur={handleFocusOut}
					ref={menuRefUL}
				>
					{itemsData.map((item: MenuItemType, index: number) => {
						return renderItem(item, index);
					})}
				</ul>
			);
		}
	};

	//
	// Render the output
	//

	// build the button content based on icon position value if icon was provided
	const buttonContent: Array<string | HTMLElement | undefined> = [label];
	if (icon && icon.position === 'start') {
		buttonContent.unshift(icon.icon);
	}
	if (icon && icon.position === 'end') {
		buttonContent.push(icon.icon);
	}

	return (
		<span className='pds-menu-button' ref={nodeRef}>
			<Button
				label={buttonContent}
				id={triggerID}
				type='button'
				className='pds-menu-button__trigger'
				aria-haspopup='true'
				aria-controls={listboxID}
				aria-expanded={isOpen}
				onClick={handleTriggerClick}
				onKeyDown={handleButtonKeyDown}
			/>
			{renderMenuItems(menuItems)}
		</span>
	);
};

//
export default MenuButton;
