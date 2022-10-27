//
// Callbacks
const dismissClick = (event, id) => {
	console.log(`[DS TOOLKIT DEBUG] Dismiss button clicked for: ${id}...`);
	const removeAtIndex = toastsSimple.findIndex((toast) => toast.id === id);
	if (removeAtIndex !== -1) {
		toastsSimple.splice(removeAtIndex, 1);
	}

	// custom event to handle Storybook updates and synchronization with Controls
	const eventTrigger = new CustomEvent('pdsDismissToast', {
		detail: toastsSimple,
	});
	document.dispatchEvent(eventTrigger);
};

const dismissAuto = (event, id) => {
	console.log(`[DS TOOLKIT DEBUG] Auto-dismiss for: ${id}...`);
	const removeAtIndex = toastsOneAutoDismiss.findIndex(
		(toast) => toast.id === id,
	);
	if (removeAtIndex !== -1) {
		toastsOneAutoDismiss.splice(removeAtIndex, 1);
	}

	// custom event to handle Storybook updates and synchronization with Controls
	const eventTrigger = new CustomEvent('pdsDismissToast', {
		detail: toastsOneAutoDismiss,
	});
	document.dispatchEvent(eventTrigger);
};

const dismissClickAuto = (event, id) => {
	console.log(`[DS TOOLKIT DEBUG] Dismiss button clicked for: ${id}...`);
	const removeAtIndex = toastsOneAutoDismiss.findIndex(
		(toast) => toast.id === id,
	);
	if (removeAtIndex !== -1) {
		toastsOneAutoDismiss.splice(removeAtIndex, 1);
	}

	// custom event to handle Storybook updates and synchronization with Controls
	const eventTrigger = new CustomEvent('pdsDismissToast', {
		detail: toastsOneAutoDismiss,
	});
	document.dispatchEvent(eventTrigger);
};

//
// Data
export const toastsSimple = [
	{
		id: `pds-toast-7gVgbAhI`,
		type: 'info',
		message: 'This is the first toast.',
		onDismiss: dismissClick,
	},
	{
		id: `pds-toast-xAtNczUX`,
		type: 'success',
		message: 'This is the second toast.',
		onDismiss: dismissClick,
	},
	{
		id: `pds-toast-5WJ6f4sp`,
		type: 'warning',
		message: 'This is the third toast.',
		onDismiss: dismissClick,
	},
	{
		id: `pds-toast-e94ox5jH`,
		type: 'error',
		message: 'This is the fourth toast.',
		onDismiss: dismissClick,
	},
	{
		id: `pds-toast-d8nvifUp`,
		type: 'pantheon',
		message: 'This is the fifth toast.',
		onDismiss: dismissClick,
	},
];

export const autoDismissTimeInSeconds = 6;
export const toastsOneAutoDismiss = [
	{
		id: `pds-toast-QSo53zqy`,
		type: 'info',
		message: 'This is the first toast.',
		onDismiss: dismissClickAuto,
	},
	{
		id: `pds-toast-jykVLxP9`,
		type: 'success',
		message: 'This is the second toast.',
		onDismiss: dismissClickAuto,
	},
	{
		id: `pds-toast-Be3aGgQ0`,
		type: 'warning',
		message: 'This is the third toast.',
		autodismiss: {
			autodismiss: true,
			timeInSeconds: autoDismissTimeInSeconds,
		},
		onDismiss: dismissAuto,
	},
	{
		id: `pds-toast-nYOOS9VI`,
		type: 'error',
		message: 'This is the fourth toast.',
		onDismiss: dismissClickAuto,
	},
	{
		id: `pds-toast-3i3H6lTQ`,
		type: 'pantheon',
		message: 'This is the fifth toast.',
		onDismiss: dismissClickAuto,
	},
];
