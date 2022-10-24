//
// Callbacks
const dismissClickSomeDismissible = (event, id) => {
	console.log(`[DS TOOLKIT DEBUG] Dismiss button clicked for: ${id}...`);
	const removeAtIndex = toastsSomeDismissible.findIndex(
		(toast) => toast.id === id,
	);
	if (removeAtIndex !== -1) {
		toastsSomeDismissible.splice(removeAtIndex, 1);
	}

	// custom event to handle Storybook updates and synchronization with Controls
	const eventTrigger = new CustomEvent('pdsDismissToast', {
		detail: toastsSomeDismissible,
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

//
// Data
export const toastsSimple = [
	{
		id: `pds-toast-7gVgbAhI`,
		type: 'info',
		message: 'This is the first toast.',
	},
	{
		id: `pds-toast-xAtNczUX`,
		type: 'success',
		message: 'This is the second toast.',
	},
	{
		id: `pds-toast-5WJ6f4sp`,
		type: 'warning',
		message: 'This is the third toast.',
	},
	{
		id: `pds-toast-e94ox5jH`,
		type: 'error',
		message: 'This is the fourth toast.',
	},
	{
		id: `pds-toast-d8nvifUp`,
		type: 'pantheon',
		message: 'This is the fifth toast.',
	},
];

export const toastsSomeDismissible = [
	{
		id: `pds-toast-TNGnBMsf`,
		type: 'info',
		message: 'This is the first toast.',
		isDismissible: true,
		onDismiss: dismissClickSomeDismissible,
	},
	{
		id: `pds-toast-hD0M3BsI`,
		type: 'success',
		message: 'This is the second toast.',
	},
	{
		id: `pds-toast-8kP1OYK8`,
		type: 'warning',
		message: 'This is the third toast.',
	},
	{
		id: `pds-toast-qHEnGx0E`,
		type: 'error',
		message: 'This is the fourth toast.',
		isDismissible: true,
		onDismiss: dismissClickSomeDismissible,
	},
	{
		id: `pds-toast-5bh1fW7k`,
		type: 'pantheon',
		message: 'This is the fifth toast.',
	},
];

export const autoDismissTimeInSeconds = 6;
export const toastsOneAutoDismiss = [
	{
		id: `pds-toast-QSo53zqy`,
		type: 'info',
		message: 'This is the first toast.',
	},
	{
		id: `pds-toast-jykVLxP9`,
		type: 'success',
		message: 'This is the second toast.',
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
	},
	{
		id: `pds-toast-3i3H6lTQ`,
		type: 'pantheon',
		message: 'This is the fifth toast.',
	},
];
