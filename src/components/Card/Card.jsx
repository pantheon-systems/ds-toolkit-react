import PropTypes from 'prop-types';

import './card.css';

/**
 * Card UI component
 */
const Card = ({ children, className, ...props }) => {
	return (
		<div className={['pds-card', className].join(' ').trim()}>{children}</div>
	);
};

//

// Component propType definitions
Card.propTypes = {
	/**
	 * Card content.
	 */
	children: PropTypes.node.isRequired,
	/**
	 * Additional class names.
	 */
	className: PropTypes.string,
};

export default Card;
