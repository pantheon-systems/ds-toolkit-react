import ToastsComponent from './Toasts';
import DocsDescription from './Toasts.docs.md';

import { createShortUUID } from '../../libs/components/utils';

const dismissClick = (event, id) => {
	console.log(`!!! Dismiss button clicked for: ${id}...`);
	const removeAtIndex = toasts.findIndex((toast) => toast.id === id);
	if (removeAtIndex !== -1) {
		toasts.splice(removeAtIndex, 1);
	}
	console.log(`!!! Toasts => `, toasts);
};

const dismissAuto = (event, id) => {
	console.log(`!!! Auto-dismiss for: ${id}...`);
	const removeAtIndex = toasts.findIndex((toast) => toast.id === id);
	if (removeAtIndex !== -1) {
		toasts.splice(removeAtIndex, 1);
	}
	console.log(`!!! Toasts => `, toasts);
};

const toasts = [
	{
		id: `pds-toast-${createShortUUID()}`,
		type: 'info',
		message: 'This is the first toast.',
		isDismissible: true,
		onDismiss: dismissClick,
	},
	{
		id: `pds-toast-${createShortUUID()}`,
		type: 'success',
		message: 'This is the second toast.',
		isDismissible: true,
		onDismiss: dismissClick,
	},
	{
		id: `pds-toast-${createShortUUID()}`,
		type: 'warning',
		message: 'This is the third toast.',
		autodismiss: {
			autodismiss: true,
			timeInSeconds: 6,
		},
		onDismiss: dismissAuto,
	},
	{
		id: `pds-toast-${createShortUUID()}`,
		type: 'error',
		message: 'This is the fourth toast.',
		isDismissible: true,
		onDismiss: dismissClick,
	},
	{
		id: `pds-toast-${createShortUUID()}`,
		type: 'pantheon',
		message: 'This is the fifth toast.',
		autodismiss: {
			autodismiss: true,
			timeInSeconds: 6,
		},
		onDismiss: dismissAuto,
	},
];

export default {
	title: 'Components/Toasts',
	component: ToastsComponent,
	parameters: {
		componentSubtitle: 'A component to display toast messages',
		docs: {
			description: {
				component: DocsDescription,
			},
			source: {
				excludeDecorators: true,
			},
		},
	},
	argTypes: {},
	decorators: [],
};

const Template = (args) => (
	<>
		<ToastsComponent {...args} />
		<button
			onClick={(e) => {
				toasts.push({
					id: `pds-toast-${createShortUUID()}`,
					type: 'info',
					message: 'This is the newly added toast.',
				});
				console.log(`!!! Toasts => `, toasts);
			}}
		>
			Add toast
		</button>
	</>
);

export const Toasts = Template.bind({});
Toasts.args = {
	toasts: toasts,
};
Toasts.storyName = 'Toasts';
