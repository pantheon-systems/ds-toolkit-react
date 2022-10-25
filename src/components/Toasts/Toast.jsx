import { useState, useEffect, useRef, memo } from 'react';
import PropTypes from 'prop-types';

import './toast.css';

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

const typeLabels = {
	info: 'Info',
	warning: 'Warning',
	error: 'Error',
	success: 'Success',
	pantheon: 'Pantheon',
};

const Toast = ({ id, type, message, onDismiss, autodismiss }) => {
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
		onDismiss(event, id);
	};

	const handleDismiss = (event) => {
		dismissAnimationEndEventHandler();
		toastRef.current.classList.toggle(cssClasses.dismissing);
	};

	//

	const timerValueWidth = (timer.value / timer.time) * 100 + '%';

	const toastLabel = `[${typeLabels[type]}] `;

	return (
		<div
			className={css.join(' ').trim()}
			id={id}
			ref={toastRef}
			tabIndex='0'
			aria-labelledby={`${id}-label`}
		>
			{decorator}

			<div id={`${id}-label`} className='pds-toast__content'>
				<span className='pds-a11y-content'>{toastLabel}</span>
				{message}
			</div>

			<button
				className={cssClasses.dismiss}
				onClick={handleDismiss}
				aria-label='Dismiss'
				role='button'
			>
				<IconClear />
			</button>

			{autodismiss?.autodismiss && (
				<div
					className='pds-toast__timer'
					value={timer.value}
					role='progressbar'
					aria-valuemin='0'
					aria-valuemax={timer.max}
					aria-valuenow={timer.value}
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

//
// Prop types

//
// Component propType definitions
Toast.propTypes = {
	/**
	 * Unique ID of toast to show.
	 */
	id: PropTypes.string,
	/**
	 * Type of toast to show.
	 */
	type: PropTypes.oneOf(['info', 'success', 'warning', 'error', 'pantheon']),
	/**
	 * Content to display.
	 */
	message: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
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
};

Toast.defaultProps = {
	type: 'info',
};

export default memo(Toast);
