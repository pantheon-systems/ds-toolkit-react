import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import './toasts.css';
import { IconInfo } from '../__shared/__assets/icons/icon-info';
import { IconCheckmark } from '../__shared/__assets/icons/icon-checkmark';
import { IconWarning } from '../__shared/__assets/icons/icon-warning';
import { IconError } from '../__shared/__assets/icons/icon-error';
import { IconPantheon } from '../__shared/__assets/icons/icon-pantheon';
import { IconClear } from '../__shared/__assets/icons/icon-clear';

const cssClasses = {
	decorator: 'pds-toast__decorator',
	dismiss: 'pds-toast__dismiss',
	warning: 'pds-toast__warning',
	error: 'pds-toast__error',
	success: 'pds-toast__success',
	pantheon: 'pds-toast__pantheon',
	info: 'pds-toast__info',
	dismissing: 'pds-dismissing',
};

const decorators = {
	warning: <IconWarning className={cssClasses.decorator} />,
	error: <IconError className={cssClasses.decorator} />,
	success: <IconCheckmark className={cssClasses.decorator} />,
	pantheon: <IconPantheon className={cssClasses.decorator} />,
	info: <IconInfo className={cssClasses.decorator} />,
};

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
	console.log(`!!! Toasts =>`, toasts);

	const Toast = ({
		id,
		type,
		message,
		isDismissible,
		onDismiss,
		autodismiss,
	}) => {
		const css = ['pds-toast', cssClasses[type]];
		let decorator = decorators[type];

		const [timer, setTimer] = useState({
			time: autodismiss?.timeInSeconds,
			value: autodismiss?.timeInSeconds,
			unit: 'seconds',
		});

		const toastRef = useRef(null);

		//

		useEffect(() => {
			let countdownTimer;

			// Add timer if autodismiss is enabled for this toast
			if (autodismiss?.autodismiss) {
				countdownTimer = setInterval(() => {
					setTimer((prevTimer) => {
						if (prevTimer.value === 0) {
							clearInterval(countdownTimer);

							// call onDismiss callback
							dismissAnimationEndEventHandler();
							toastRef.current.classList.toggle(cssClasses.dismissing);
						}

						return { ...prevTimer, value: prevTimer.value - 1 };
					});
				}, 1000);
			}

			return () => {
				clearInterval(countdownTimer);
			};
		}, []);

		//

		const dismissAnimationEndEventHandler = () => {
			toastRef.current.addEventListener('animationend', triggerOnDismiss, {
				once: true,
			});
		};

		const triggerOnDismiss = (event) => {
			/* toastRef.current.remove(); */
			onDismiss(event, id);
		};

		const handleDismiss = (event) => {
			dismissAnimationEndEventHandler();
			toastRef.current.classList.toggle(cssClasses.dismissing);
		};

		//

		const timerValueWidth = (timer.value / timer.time) * 100 + '%';

		return (
			<div className={css.join(' ').trim()} id={id} ref={toastRef}>
				{decorator}

				<div className='pds-toast__content'>{message}</div>

				{isDismissible && (
					<button
						className={cssClasses.dismiss}
						onClick={handleDismiss}
						title='Dismiss toast message'
					>
						<IconClear />
					</button>
				)}

				{autodismiss?.autodismiss && (
					<div
						className='pds-toast__timer'
						value={timer.value}
						role='progressbar'
						aria-valuemin='0'
						aria-valuemax={timer.max}
						aria-valuenow={`${timer.value} ${timer.unit}`}
						aria-label='Toast timer countdown'
					>
						<div
							className='pds-toast__timer-value'
							style={{ width: timerValueWidth }}
						></div>
					</div>
				)}
			</div>
		);
	};

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
			role='status'
		>
			{toastsToShow.map((toast, idx) => {
				return <Toast {...toast} key={`pds-toasts-toast-${idx}`} />;
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
			 * Is the toast dismissible?
			 */
			isDismissible: PropTypes.bool,
			/**
			 * Function to manage what occurs when the toast's dismiss button is clicked, or the auto-dismiss timer ends.
			 * NOTE: This is required if `isDismissible` or autodismiss is set to true.
			 */
			onDismiss: PropTypes.func,
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
	maxToastsVisible: 3,
	position: 'start-end',
};

//
export default Toasts;
