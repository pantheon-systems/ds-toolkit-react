import PropTypes from 'prop-types';

import './alert-inline.css';
import { IconInfo } from '../__shared/__assets/icons/icon-info';
import { IconCheckmark } from '../__shared/__assets/icons/icon-checkmark';
import { IconWarning } from '../__shared/__assets/icons/icon-warning';
import { IconError } from '../__shared/__assets/icons/icon-error';
import { IconPantheon } from '../__shared/__assets/icons/icon-pantheon';
import { IconClear } from '../__shared/__assets/icons/icon-clear';

const cssClasses = {
	decorator: 'pds-alert-inline__decorator',
	dismiss: 'pds-alert-inline__dismiss',
	warning: 'pds-alert-inline__warning',
	error: 'pds-alert-inline__error',
	success: 'pds-alert-inline__success',
	pantheon: 'pds-alert-inline__pantheon',
	info: 'pds-alert-inline__info',
};

/**
 * AlertInline UI component
 */
const AlertInline = ({ type, message, isDismissible, onDismiss }) => {
	const css = ['pds-alert-inline'];
	let Decorator;

	switch (type) {
		case 'warning':
			css.push(cssClasses.warning);
			Decorator = ({ className }) => (
				<IconWarning className={cssClasses.decorator} />
			);
			break;

		case 'error':
			css.push(cssClasses.error);
			Decorator = ({ className }) => (
				<IconError className={cssClasses.decorator} />
			);
			break;

		case 'success':
			css.push(cssClasses.success);
			Decorator = ({ className }) => (
				<IconCheckmark className={cssClasses.decorator} />
			);
			break;

		case 'pantheon':
			css.push(cssClasses.pantheon);
			Decorator = ({ className }) => (
				<IconPantheon className={cssClasses.decorator} />
			);
			break;

		default:
			css.push(cssClasses.info);
			Decorator = ({ className }) => (
				<IconInfo className={cssClasses.decorator} />
			);
	}

	//
	// Render the output
	return (
		<div className={css.join(' ').trim()}>
			<Decorator />

			<div className='pds-alert-inline__content'>{message}</div>

			{isDismissible && (
				<button
					className={cssClasses.dismiss}
					onClick={onDismiss}
					title='Dismiss alert'
				>
					<IconClear />
				</button>
			)}
		</div>
	);
};

//
// Prop types

//
// Component propType definitions
AlertInline.propTypes = {
	/**
	 * Type of alert to show.
	 */
	type: PropTypes.oneOf(['info', 'success', 'warning', 'error', 'pantheon']),
	/**
	 * Content to display.
	 */
	message: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
	/**
	 * Is the alert dismissible?
	 */
	isDismissible: PropTypes.bool,
	/**
	 * Function to manage what occurs when the alert's dismiss button is clicked.
	 * NOTE: This is required if `isDismissible` is set to true.
	 */
	onDismiss: PropTypes.func,
};

AlertInline.defaultProps = {
	type: 'info',
	isDismissible: false,
};

//
export default AlertInline;
