import PropTypes from 'prop-types';

import './announcement.css';
import { IconInfo } from '../__shared/__assets/icons/icon-info';
import { IconWarning } from '../__shared/__assets/icons/icon-warning';
import { IconClear } from '../__shared/__assets/icons/icon-clear';

const cssClasses = {
	decorator: 'pds-announcement__decorator',
	dismiss: 'pds-announcement__dismiss',
	warning: 'pds-announcement__warning',
	info: 'pds-announcement__info',
};

const decorators = {
	warning: <IconWarning className={cssClasses.decorator} />,
	info: <IconInfo className={cssClasses.decorator} />,
};

/**
 * Announcement UI component
 */
const Announcement = ({ type, message, isDismissible, onDismiss }) => {
	const css = ['pds-announcement', cssClasses[type]];
	const decorator = decorators[type];

	//
	// Render the output
	return (
		<div className={css.join(' ').trim()}>
			{decorator}

			<div className='pds-announcement__content'>{message}</div>

			{isDismissible && (
				<button
					className={cssClasses.dismiss}
					onClick={onDismiss}
					title='Dismiss announcement'
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
Announcement.propTypes = {
	/**
	 * Type of announcement to show.
	 */
	type: PropTypes.oneOf(['info', 'warning']),
	/**
	 * Content to display.
	 */
	message: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
	/**
	 * Is the announcement dismissible?
	 */
	isDismissible: PropTypes.bool,
	/**
	 * Function to manage what occurs when the alert's dismiss button is clicked.
	 * NOTE: This is required if `isDismissible` is set to true.
	 */
	onDismiss: PropTypes.func,
};

Announcement.defaultProps = {
	type: 'info',
	isDismissible: false,
};

//
export default Announcement;
