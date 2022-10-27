import PropTypes from 'prop-types';
import Toast from './Toast';

import './toasts.css';

const locations = {
	'start-start': {
		insetInlineStart: 0,
		insetBlockStart: 0,
	},
	'start-end': {
		insetInlineEnd: 0,
		insetBlockStart: 0,
	},
	'end-start': {
		insetInlineStart: 0,
		insetBlockEnd: 0,
	},
	'end-end': {
		insetInlineEnd: 0,
		insetBlockEnd: 0,
	},
};

/**
 * Toasts UI component
 */
const Toasts = ({ toasts, position }) => {
	//
	// Render the output
	return (
		<div
			className={`pds-toasts__container pds-location-${position}`}
			style={locations[position]}
			role='log'
			aria-label='Notifications'
		>
			{toasts.map((toast, idx) => {
				return <Toast {...toast} key={toast.id} />;
			})}
		</div>
	);
};

//
// Prop types

//
// Component propType definitions
Toasts.propTypes = {
	/**
	 * Array of toast objects to show.
	 */
	toasts: PropTypes.arrayOf(
		PropTypes.shape({
			/**
			 * Unique ID of toast to show.
			 */
			id: PropTypes.string,
			/**
			 * Type of toast to show.
			 */
			type: PropTypes.oneOf([
				'info',
				'success',
				'warning',
				'error',
				'pantheon',
			]),
			/**
			 * Content to display.
			 */
			message: PropTypes.oneOfType([PropTypes.node, PropTypes.string])
				.isRequired,
			/**
			 * Function to manage what occurs when the toast's dismiss button is clicked, or the auto-dismiss timer ends.
			 * NOTE: This is required if `isDismissible` or autodismiss is set to true.
			 */
			onDismiss: PropTypes.func.isRequired,
		}),
	),
	/**
	 * Location toast objects will show in the UI.
	 */
	position: PropTypes.oneOf([
		'start-start',
		'start-end',
		'end-start',
		'end-end',
	]),
};

Toasts.defaultProps = {
	position: 'start-end',
};

//
export default Toasts;
