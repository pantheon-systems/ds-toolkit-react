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

const Toast = ({ id, type, message, onDismiss }) => {
	const css = ['pds-toast', cssClasses[type]];
	let decorator = decorators[type];

	const toastRef = useRef(null);

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
	 * Function to manage what occurs when the toast's dismiss button is clicked, or the auto-dismiss timer ends.
	 * NOTE: This is required if `isDismissible` or autodismiss is set to true.
	 */
	onDismiss: PropTypes.func.isRequired,
};

Toast.defaultProps = {
	type: 'info',
};

export default memo(Toast);
