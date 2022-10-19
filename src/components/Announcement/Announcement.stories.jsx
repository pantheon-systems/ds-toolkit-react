import AnnouncementComponent from './Announcement';
import DocsDescription from './Announcement.docs.md';

export default {
	title: 'Components/Announcement',
	component: AnnouncementComponent,
	parameters: {
		componentSubtitle: 'A component to show a product/top level announcement',
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

const Template = (args) => <AnnouncementComponent {...args} />;

export const Announcement = Template.bind({});
Announcement.args = {
	message: (
		<>
			This is an example with <a href='#'>an action</a>.
		</>
	),
};
Announcement.storyName = 'Default';

export const AnnouncementDismissible = Template.bind({});
AnnouncementDismissible.args = {
	message: 'This is an example announcement.',
	isDismissible: true,
	onDismiss: () => {
		window.alert(`Dismiss button clicked...`);
	},
};
AnnouncementDismissible.storyName = 'Dismissible';
