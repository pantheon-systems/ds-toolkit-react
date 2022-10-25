import ToastsComponent from './Toasts';
import DocsDescription from './Toasts.docs.md';

import { useEffect } from 'react';
import { useArgs } from '@storybook/client-api';

import {
	toastsSimple,
	toastsSomeDismissible,
	toastsOneAutoDismiss,
} from './toasts-sample-data';

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
	decorators: [
		(Story) => {
			// programmatically update args/Controls
			const [_, updateArgs] = useArgs();

			// Handle custom dismiss event and force a component update
			const handleDismiss = (event) => {
				console.log(`[DS TOOLKIT DEBUG] PDS Dismiss Toast event received...`);
				updateArgs();
			};

			useEffect(() => {
				// Add custom event listener
				document.addEventListener('pdsDismissToast', handleDismiss);

				return () => {
					// On unmount remove custom event listener
					document.removeEventListener('pdsDismissToast', handleDismiss);
				};
			}, []);

			return (
				<div style={{ height: '20rem' }}>
					<Story />
				</div>
			);
		},
	],
};

const Template = (args) => <ToastsComponent {...args} />;

export const Toasts = Template.bind({});
Toasts.args = {
	toasts: toastsSimple,
};
Toasts.storyName = 'Default';

export const ToastsAutoDismiss = Template.bind({});
ToastsAutoDismiss.args = {
	toasts: toastsOneAutoDismiss,
};
ToastsAutoDismiss.storyName = 'With Auto-dismiss';
