import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { useFloating, offset, flip } from '@floating-ui/react-dom';
import { createShortUUID } from '../../libs/components/utils';

import './combobox-select.css';

import { defaultIcon, checkmarkIcon } from './combobox-select-icons';

/**
 * Combobox select-only UI component
 */
const ComboboxSelect = ({ label, icon, selectOptions, onChange, value }) => {
	// Floating UI support
	const {
		x,
		y,
		reference,
		floating,
		strategy,
		update: FUI_Update,
		placement,
		refs,
	} = useFloating({
		placement: 'bottom-start',
		middleware: [flip()],
	});

	// generate a short unique ID to add to ID attributes
	const salt = createShortUUID();
	const [labelID] = useState(`combobox-select-${salt}-label`);
	const [inputID] = useState(`combobox-select-${salt}-input`);
	const [listboxID] = useState(`combobox-select-${salt}-listbox`);

	const inputRef = reference;
	const inputRefActual = refs.reference;
	const listboxRef = floating;
	const listboxRefActual = refs.floating;
	const nodeRef = useRef(null);
	const activeOption = useRef(null);

	const [isOpen, setIsOpen] = useState(false);
	const [focusListbox, setFocusListbox] = useState(false);
	const [activeDescendant, setActiveDescendant] = useState('');
	const [activeSelectOptionIndex, setActiveSelectOptionIndex] = useState(0);
	const [selectedOption, setSelectedOption] = useState(null);

	// Non-state instance trackers
	const selectOptionIDs = useRef(new Array());
	const selectOptionItems = useRef(new Array());

	useLayoutEffect(() => {
		// setup the onClick outside handler
		window.addEventListener('mousedown', handleClickOutside, true);

		// Update Floating UI placement
		FUI_Update();

		// Add the Floating UI data attribute
		const listboxElem = listboxRefActual.current;

		if (listboxElem) {
			listboxElem.dataset.fuiPlacement = placement;
		}

		// only focus the menu when state instructs us to
		if (focusListbox) {
			// focus the menu element
			// NOTE: setTimeout is used to prevent focus change from conflicting with Floating UI
			setTimeout(() => {
				listboxElem.focus();
			}, 0);
			// reset state
			setFocusListbox(false);
		}

		return () => {
			window.removeEventListener('mousedown', handleClickOutside, true);
		};
	}, [isOpen, placement]);

	// Update scroll when active option changes
	useLayoutEffect(() => {
		// Update scroll position
		updateScroll();
	}, [activeDescendant, isOpen]);

	// only run on initial load / componentDidMount
	useLayoutEffect(() => {
		// if a value was passed in set the selectedOption correctly
		if (value) {
			const valueIndex = selectOptionItems.current.findIndex(
				(item) => item.value === value || item.label === value,
			);

			selectOptionItem(selectOptionIDs.current[valueIndex]);
		}
	}, []);

	//
	// Internal/support methods
	//

	//
	//

	const setActiveSelectOption = (elemID, index) => {
		setActiveDescendant(elemID);
		setActiveSelectOptionIndex(index);
	};

	const openListbox = () => {
		setIsOpen(true);
		setFocusListbox(true);
	};

	const closeListbox = () => {
		setIsOpen(false);
		inputRefActual.current.focus();

		// if we have an active descendant that doesn't match the selected option,
		// reset active descendant to be the selected option.
		// This maintains focus on the selected option and not the last focused option.
		if (selectedOption && activeOption.current !== selectedOption) {
			activeOption.current = selectedOption;
			setActiveDescendant(activeOption.current.id);
			const optionIndex = selectOptionIDs.current[activeOption.current.id];
			setActiveSelectOptionIndex(optionIndex);
		}
	};

	const setFocusByFirstCharacter = (char) => {
		// ensure lowercase for easier comparison
		char = char.toLowerCase();
		// track if we've found an item yet
		let itemFound = false;

		// loop from current active index to end of focusable items
		for (
			let i = activeSelectOptionIndex + 1;
			i < selectOptionItems.current.length;
			i++
		) {
			const item = selectOptionItems.current[i];

			if (item.label.toLowerCase().startsWith(char)) {
				setActiveSelectOption(selectOptionIDs.current[i], i);
				// report that we found an item
				itemFound = true;
				// break out of loop
				break;
			}
		}

		// loop from beginning of focusable items to item prior to current active index
		// !! Continue search only if we haven't found an item yet
		if (itemFound === false) {
			for (let i = 0; i < activeSelectOptionIndex; i++) {
				const item = selectOptionItems.current[i];

				if (item.label.toLowerCase().startsWith(char)) {
					setActiveSelectOption(selectOptionIDs.current[i], i);
					// break out of loop
					break;
				}
			}
		}
	};

	const selectOptionItem = (itemID) => {
		const itemIndex = selectOptionIDs.current.indexOf(itemID);
		const item = selectOptionItems.current[itemIndex];

		item.index = itemIndex;
		setSelectedOption(item);

		// call the onChange function that was passed in and give it the item value or label
		onChange(item.value || item.label);
	};

	const selectCurrentOptionItem = () => {
		const currentItemID = selectOptionIDs.current[activeSelectOptionIndex];
		selectOptionItem(currentItemID);
	};

	const updateScroll = () => {
		const listboxElem = listboxRefActual.current;
		const activeOptionItem = activeOption.current;

		if (
			activeOptionItem &&
			listboxElem.scrollHeight > listboxElem.clientHeight
		) {
			const scrollBottom = listboxElem.clientHeight + listboxElem.scrollTop;
			const optionBottom =
				activeOptionItem.offsetTop + activeOptionItem.offsetHeight;

			if (optionBottom > scrollBottom) {
				listboxElem.scrollTop = optionBottom - listboxElem.clientHeight;
			} else if (activeOptionItem.offsetTop < listboxElem.scrollTop) {
				listboxElem.scrollTop = activeOptionItem.offsetTop;
			}
		}
	};

	//
	// Event handler functions
	//
	const handleComboboxClick = (event) => {
		setIsOpen((prevState) => {
			return !prevState;
		});

		setFocusListbox((prevState) => {
			return !prevState;
		});

		event.stopPropagation();
		event.preventDefault();
	};

	const handleSelectOptionClick = (event) => {
		selectOptionItem(event.currentTarget.id);
		closeListbox();
	};

	const handleComboboxKeyDown = (event) => {
		var key = event.key,
			flag = false,
			optionID = '',
			optionIndex = 0;

		switch (key) {
			// open menu and focus on first menu item
			case ' ':
			case 'Enter':
			case 'ArrowDown':
			case 'Down':
				optionID = selectOptionIDs.current[0];
				optionIndex = 0;

				// if we already have a selection focus on it
				if (selectedOption) {
					optionID = selectOptionIDs.current[selectedOption.index];
					optionIndex = selectedOption.index;
				}

				setActiveSelectOption(optionID, optionIndex);
				openListbox();
				flag = true;
				break;

			// close menu
			case 'Esc':
			case 'Escape':
				closeListbox();
				flag = true;
				break;

			// open menu and focus on last menu item
			case 'Up':
			case 'ArrowUp':
				const lastIndex = selectOptionIDs.current.length - 1;
				optionID = selectOptionIDs.current[lastIndex];
				optionIndex = lastIndex;

				// if we already have a selection focus on it
				if (selectedOption) {
					optionID = selectOptionIDs.current[selectedOption.index];
					optionIndex = selectedOption.index;
				}

				setActiveSelectOption(optionID, optionIndex);

				openListbox();
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

	const handleListboxKeyDown = (event) => {
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
				closeListbox();
				flag = true;
			}
		} else {
			switch (key) {
				case ' ':
				case 'Enter':
					closeListbox();
					selectCurrentOptionItem();
					flag = true;
					break;

				case 'Esc':
				case 'Escape':
					closeListbox();
					flag = true;
					break;

				case 'Up':
				case 'ArrowUp':
					moveToIndex = activeSelectOptionIndex - 1;
					if (moveToIndex < 0) {
						moveToIndex = selectOptionIDs.current.length - 1;
					}
					moveToItemID = selectOptionIDs.current[moveToIndex];
					setActiveSelectOption(moveToItemID, moveToIndex);
					flag = true;
					break;

				case 'ArrowDown':
				case 'Down':
					moveToIndex = activeSelectOptionIndex + 1;
					if (moveToIndex > selectOptionIDs.current.length - 1) {
						moveToIndex = 0;
					}
					moveToItemID = selectOptionIDs.current[moveToIndex];
					setActiveSelectOption(moveToItemID, moveToIndex);
					flag = true;
					break;

				case 'Home':
				case 'PageUp':
					setActiveSelectOption(selectOptionIDs.current[0], 0);
					flag = true;
					break;

				case 'End':
				case 'PageDown':
					const lastIndex = selectOptionIDs.current.length - 1;
					setActiveSelectOption(selectOptionIDs.current[lastIndex], lastIndex);
					flag = true;
					break;

				case 'Tab':
					closeListbox();
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

	// Handle click outside event to close menu if open
	const handleClickOutside = (event) => {
		if (!nodeRef.current?.contains(event.target)) {
			if (isOpen) {
				setIsOpen(false);
			}
		}
	};

	//
	//

	// function to render each menu item correctly
	const renderSelectOption = (item, index) => {
		const itemID = listboxID + '-item-' + (index + 1);

		// render a menu item if it has a label value
		if (item.label) {
			selectOptionIDs.current.push(itemID);
			selectOptionItems.current.push(item);

			// decide if this item should be shown to have focus
			let shouldFocus = false;
			if (activeDescendant !== '') {
				shouldFocus = activeDescendant === itemID;
			}

			// track if option is selected
			const isSelected = selectedOption === item;

			return (
				<li
					id={itemID}
					key={itemID}
					className={shouldFocus ? 'pds-combobox-select__item-focused' : ''}
					aria-selected={isSelected}
					role='option'
					tabIndex={-1}
					onClick={handleSelectOptionClick}
					ref={shouldFocus ? activeOption : undefined}
				>
					{item.label}
					{isSelected && checkmarkIcon}
				</li>
			);
		}
	};

	// Function to render the select options
	const renderSelectOptions = (items) => {
		// reset tracking variables
		selectOptionIDs.current = new Array();
		selectOptionItems.current = new Array();

		// Render plain listbox without any groups

		// set initial active descendant ID value
		const initialDescendant = `${listboxID}-item-1`;

		return (
			<ul
				id={listboxID}
				role='listbox'
				tabIndex={-1}
				aria-labelledby={labelID}
				aria-activedescendant={
					activeDescendant !== '' ? activeDescendant : initialDescendant
				}
				style={{
					display: isOpen ? 'block' : 'none',
					position: strategy,
					transform: `translate(${Math.round(x)}px,${Math.round(y)}px)`,
				}}
				onKeyDown={handleListboxKeyDown}
				ref={floating}
			>
				{items.map((item, index) => {
					return renderSelectOption(item, index);
				})}
			</ul>
		);
	};

	//
	// Render the output
	//

	return (
		<span className='pds-combobox-select' ref={nodeRef}>
			<label id={labelID}>{label}</label>
			<div
				aria-controls={listboxID}
				aria-expanded={isOpen}
				aria-haspopup='listbox'
				aria-labelledby={labelID}
				id={inputID}
				className='pds-combobox-select-input'
				role='combobox'
				tabIndex={0}
				onClick={handleComboboxClick}
				onKeyDown={handleComboboxKeyDown}
				ref={inputRef}
			>
				{selectedOption?.label || 'Select an option'}
				{defaultIcon}
				{/* TODO: convert to translatable value */}
			</div>
			{renderSelectOptions(selectOptions)}
		</span>
	);
};

//
// Prop types

const SelectOptionType = PropTypes.exact({
	/**
	 * Label for a menu item
	 */
	label: PropTypes.string.isRequired,
	/**
	 * (optional) Value to store when this option is selected.
	 * If no value is provided the label will be stored as the value.
	 */
	value: PropTypes.string,
});

//
// Component propType definitions
ComboboxSelect.propTypes = {
	/**
	 * The text of the button/trigger
	 */
	label: PropTypes.string,
	/**
	 * Array of select options
	 */
	selectOptions: PropTypes.arrayOf(SelectOptionType).isRequired,
	/**
	 * Callback function that will return the updated value from the instance when it changes.
	 * Function should have the shape of: `(value) => { <do stuff here> } `.
	 */
	onChange: PropTypes.func,
	/**
	 * (optional) Initial value to set the combobox select to
	 */
	value: PropTypes.string,
};

ComboboxSelect.defaultProps = {};

//
export default ComboboxSelect;
