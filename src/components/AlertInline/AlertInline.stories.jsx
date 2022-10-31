import AlertInlineComponent from './AlertInline';
import DocsDescription from './AlertInline.docs.md';

export default {
	title: 'Components/Messaging/Alert Inline',
	component: AlertInlineComponent,
	parameters: {
		componentSubtitle: 'A component to display an alert within a content area',
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

const Template = (args) => <AlertInlineComponent {...args} />;

export const AlertInline = Template.bind({});
AlertInline.args = {
	message: `This is an example of a simple message.`,
};
AlertInline.storyName = 'Default';

export const AlertInlineDismissible = Template.bind({});
AlertInlineDismissible.args = {
	message: (
		<>
			This is an example with <a href='#'>an action</a>.
		</>
	),
	isDismissible: true,
	onDismiss: () => {
		window.alert(`Dismiss button clicked...`);
	},
};
AlertInlineDismissible.storyName = 'Dismissible';
