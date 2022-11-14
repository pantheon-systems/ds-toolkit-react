import PropTypes from 'prop-types';

import './card.css';

/**
 * Card UI component
 */
const Card = ({ children, className }) => {
	//
	// Render the output
	return <div className={`pds-card ${className}`}>{children}</div>;
};

//
// Prop types

//
// Component propType definitions
Card.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
};

Card.defaultProps = {
	className: '',
};

//
export default Card;
