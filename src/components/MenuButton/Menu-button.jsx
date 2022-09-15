import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './menu-button.css';

// Import additional components for composition
import Button from '../Button';

// function to generate a short UUID
const createShortUUID = () => {
	return crypto.randomUUID().substring(0, 8);
};

const isSeparatorItemType = (item) => {
	return item.isSeparator;
};

const isHeadingItemType = (item) => {
	return item.isHeading;
};

/**
 * Primary UI component for user interaction
 */
const MenuButton = ({ label, icon, menuItems }) => {
	// generate a short unique ID to add to ID attributes
	const salt = createShortUUID();
	const [triggerID] = useState(`menu-button-${salt}`);
	const [listboxID] = useState(`menu-listbox-${salt}`);

	const menuRefDiv = useRef(null);
	const menuRefUL = useRef(null);
	const nodeRef = useRef(null);

	const [isOpen, setIsOpen] = useState(false);
	const [focusMenu, setFocusMenu] = useState(false);
	const [activeDescendant, setActiveDescendant] = useState('');
	const [activeMenuItemIndex, setActiveMenuItemIndex] = useState(0);

	// Non-state instance trackers
	const groupIDs = useRef(new Array());
	const menuItemIDs = useRef(new Array());
	const focusableMenuItems = useRef(new Array());

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

	const setActiveMenuItem = (elemID, index) => {
		setActiveDescendant(elemID);
		setActiveMenuItemIndex(index);
	};

	const setOpenState = (value) => {
		setIsOpen(value);
	};

	const openMenu = () => {
		setIsOpen(true);
		setFocusMenu(true);
	};

	const closeMenu = () => {
		setIsOpen(false);
		nodeRef.current.querySelector(`#${triggerID}`).focus();
	};

	const setFocusByFirstCharacter = (char) => {
		// ensure lowercase for easier comparison
		char = char.toLowerCase();
		// track if we've found an item yet
		let itemFound = false;

		// loop from current active index to end of focusable items
		for (
			let i = activeMenuItemIndex + 1;
			i < focusableMenuItems.current.length;
			i++
		) {
			const item = focusableMenuItems.current[i];

			if (item.label.toLowerCase().startsWith(char)) {
				setActiveMenuItem(menuItemIDs.current[i], i);
				// report that we found an item
				itemFound = true;
				// break out of loop
				break;
			}
		}

		// loop from beginning of focusable items to item prior to current active index
		// !! Continue search only if we haven't found an item yet
		if (itemFound === false) {
			for (let i = 0; i < activeMenuItemIndex; i++) {
				const item = focusableMenuItems.current[i];

				if (item.label.toLowerCase().startsWith(char)) {
					setActiveMenuItem(menuItemIDs.current[i], i);
					// break out of loop
					break;
				}
			}
		}
	};

	const activateMenuItem = (itemID) => {
		const itemIndex = menuItemIDs.current.indexOf(itemID);
		const item = focusableMenuItems.current[itemIndex];

		// only execute callback if there is one
		if (item.callback) {
			item.callback(item);
		}
	};

	const activateCurrentMenuItem = () => {
		const currentItemID = menuItemIDs.current[activeMenuItemIndex];
		activateMenuItem(currentItemID);
	};

	//
	// Event handler functions
	//
	const handleTriggerClick = (event) => {
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

	const handleMenuItemClick = (event) => {
		closeMenu();
		activateMenuItem(event.currentTarget.id);
	};

	const handleButtonKeyDown = (event) => {
		var key = event.key,
			flag = false;

		switch (key) {
			// open menu and focus on first menu item
			case ' ':
			case 'Enter':
			case 'ArrowDown':
			case 'Down':
				openMenu();
				setActiveMenuItem(menuItemIDs.current[0], 0);
				flag = true;
				break;

			// close menu
			case 'Esc':
			case 'Escape':
				closeMenu();
				flag = true;
				break;

			// open menu and focus on last menu item
			case 'Up':
			case 'ArrowUp':
				const lastIndex = menuItemIDs.current.length - 1;
				openMenu();
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

	const handleMenuKeydown = (event) => {
		let key = event.key,
			flag = false,
			moveToItemID = '',
			moveToIndex = 0;

		function isPrintableCharacter(str) {
			return str.length === 1 && str.match(/\S/);
		}

		if (event.ctrlKey || event.altKey || event.metaKey) {
			return;
		}

		if (event.shiftKey) {
			if (isPrintableCharacter(key)) {
				setFocusByFirstCharacter(key);
				flag = true;
			}

			if (event.key === 'Tab') {
				closeMenu();
				flag = true;
			}
		} else {
			switch (key) {
				case ' ':
				case 'Enter':
					closeMenu();
					activateCurrentMenuItem();
					flag = true;
					break;

				case 'Esc':
				case 'Escape':
					closeMenu();
					flag = true;
					break;

				case 'Up':
				case 'ArrowUp':
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
					setActiveMenuItem(menuItemIDs.current[0], 0);
					flag = true;
					break;

				case 'End':
				case 'PageDown':
					const lastIndex = menuItemIDs.current.length - 1;
					setActiveMenuItem(menuItemIDs.current[lastIndex], lastIndex);
					flag = true;
					break;

				case 'Tab':
					closeMenu();
					break;

				default:
					if (isPrintableCharacter(key)) {
						setFocusByFirstCharacter(key);
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
		closeMenu();
	};

	// Handle click outside event to close menu if open
	const handleClickOutside = (event) => {
		if (nodeRef.current && !nodeRef.current.contains(event.target)) {
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
	const renderItem = (item, index, groupID = '', groupHeadingID = '') => {
		const groupIDString = groupID ? `-group-${groupID}` : '';
		const itemID = triggerID + groupIDString + '-item-' + (index + 1);

		// render a separator if found
		if (isSeparatorItemType(item)) {
			return <li role='separator' key={itemID}></li>;
		}

		// render a heading if found
		if (isHeadingItemType(item)) {
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
			focusableMenuItems.current.push(item);

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
					tabIndex={-1}
					onClick={handleMenuItemClick}
				>
					{item.label}
				</li>
			);
		}
	};

	// Function to render grouped items
	const renderMenuItemsGrouped = (items, menuItemBreaks) => {
		const groupedItems = new Array();

		// get the first break item
		let breakItem = menuItemBreaks.shift();

		// setup our temporary storage for this group
		let group = new Array();

		// iterate over all menu items
		items.map((item, index) => {
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
	const renderMenuItems = (items) => {
		// reset tracking variables
		menuItemIDs.current = new Array();
		focusableMenuItems.current = new Array();

		// Chunk menu items into groups if needed
		const itemsData = items;
		// check if we have any separators or headings in the dataset
		const menuItemBreaks = items.filter(
			isHeadingItemType || isSeparatorItemType,
		);
		const haveBreaks = menuItemBreaks.length > 0;

		// if we have breaks then split into groups at each marker
		if (haveBreaks) {
			// group the items together
			const groupedItemsData = renderMenuItemsGrouped(items, menuItemBreaks);

			// setup group IDs
			groupedItemsData.forEach(() => {
				groupIDs.current.push(createShortUUID());
			});
			let currentGroupID = groupIDs.current[0];

			// locate first valid item to properly set initial value for aria-activedescendant on menu/listbox
			const firstMenuItemIndex = groupedItemsData[0].findIndex(
				(item) => !isSeparatorItemType(item) && !isHeadingItemType(item),
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
					{groupedItemsData.map((group, index) => {
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
								{group.map((item, index) => {
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
					{itemsData.map((item, index) => {
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
	const buttonContent = [label];
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

MenuButton.propTypes = {
	/**
	 * The text of the button/trigger
	 */
	label: PropTypes.string,
	/**
	 * The icon element to render in the button/trigger and its location (start or end)
	 */
	icon: PropTypes.node,
	/**
	 * Array of menu items
	 */
	menuItems: PropTypes.arrayOf(
		PropTypes.shape({
			/**
			 * Label for a menu item
			 */
			label: PropTypes.string.isRequired,
			/**
			 * (optional) URL/HREF this menu item should navigate to
			 */
			href: PropTypes.string,
			/**
			 * (optional) Callback function to execute when menu item is clicked/tapped/activated
			 */
			callback: PropTypes.func,
		}),
	).isRequired,
};

//
export default MenuButton;
