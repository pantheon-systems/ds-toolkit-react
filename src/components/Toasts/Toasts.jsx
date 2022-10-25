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
const Toasts = ({ toasts, maxToastsVisible, position }) => {
	// Determine if we need to limit how many toasts should be visible
	let toastsToShow = toasts;
	let moreHidden = false;
	if (maxToastsVisible < toasts.length) {
		toastsToShow = toasts.slice(0, maxToastsVisible);
		moreHidden = toasts.length - maxToastsVisible;
	}

	//
	// Render the output
	return (
		<div
			className={`pds-toasts__container pds-location-${position}`}
			style={locations[position]}
			role='log'
			aria-label='Notifications'
		>
			{toastsToShow.map((toast, idx) => {
				return <Toast {...toast} key={toast.id} />;
			})}

			{moreHidden && (
				<div className='pds-toasts__more-hidden'>{moreHidden} more hidden</div>
			)}
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
			 * Auto-dismiss config
			 */
			autodismiss: PropTypes.shape({
				autodismiss: PropTypes.bool,
				timeInSeconds: PropTypes.number,
			}),
			/**
			 * Function to manage what occurs when the toast's dismiss button is clicked, or the auto-dismiss timer ends.
			 * NOTE: This is required if `isDismissible` or autodismiss is set to true.
			 */
			onDismiss: PropTypes.func.isRequired,
		}),
	),
	/**
	 * Maximum number of toast objects to show in the UI.
	 */
	maxToastsVisible: PropTypes.number,
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
	maxToastsVisible: 999,
	position: 'start-end',
};

//
export default Toasts;
