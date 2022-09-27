import PropTypes from 'prop-types';

import Button from '../Button';
import MenuButton from '../MenuButton/';

import './button-split.css';

/**
 * ButtonSplit UI component
 */
const ButtonSplit = ({ actionItems }) => {
	// store the first item as the primary action
	const primaryAction = actionItems[0];

	//
	// Render the output
	return (
		<span className='pds-button-split'>
			<Button
				label={primaryAction.label}
				onClick={() => primaryAction.callback(primaryAction)}
				className='pds-button-split__primary-action'
			/>
			<MenuButton
				menuItems={actionItems}
				className='pds-button-split__menu-button'
			/>
		</span>
	);
};

//
// Prop types

const ActionItemType = PropTypes.exact({
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
	actionItems: PropTypes.arrayOf(ActionItemType).isRequired,
};

ButtonSplit.defaultProps = {};

//
export default ButtonSplit;
