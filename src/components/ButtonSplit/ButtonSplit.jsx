import PropTypes from 'prop-types';

import Button from '../Button';
import MenuButton from '../MenuButton/';

import './button-split.css';

/**
 * ButtonSplit UI component
 */
const ButtonSplit = ({ menuItems }) => {
	// store the first item as the primary action
	const primaryAction = menuItems[0];

	//
	// Render the output
	return (
		<span className='pds-button-split'>
			<Button
				label={primaryAction.label}
				onClick={() => primaryAction.callback(primaryAction)}
			/>
			<MenuButton menuItems={menuItems} />
		</span>
	);
};

//
// Prop types

const MenuItemType = PropTypes.exact({
	/**
	 * Label for a menu item
	 */
	label: PropTypes.string.isRequired,
	/**
	 * Callback function to execute when menu item is clicked/tapped/activated
	 */
	callback: PropTypes.func.isRequired,
});

//
// Component propType definitions
ButtonSplit.propTypes = {
	/**
	 * Array of menu items
	 */
	menuItems: PropTypes.arrayOf(MenuItemType).isRequired,
};

ButtonSplit.defaultProps = {};

//
export default ButtonSplit;
