import MenuButtonComponent from './Menu-button';
import DocsDescription from './Menu-button.docs.md';

import {
	sampleMenuItems,
	sampleSimpleMenuItems,
} from './menu-button-sample-data';

export default {
	title: 'Components/Menu Button',
	component: MenuButtonComponent,
	parameters: {
		componentSubtitle: 'A component used to render a button that opens a menu',
		docs: {
			description: {
				component: DocsDescription,
			},
		},
	},
	argTypes: {
		menuItems: {
			description: 'Sample data sets of menu items',
			options: Object.keys({ sampleMenuItems, sampleSimpleMenuItems }),
			mapping: { sampleMenuItems, sampleSimpleMenuItems },
			control: {
				type: 'select',
				labels: {
					sampleMenuItems: 'Menu items, headings, and separators',
					sampleSimpleMenuItems: 'Menu items only',
				},
			},
		},
	},
	decorators: [
		(Story) => (
			<div style={{ marginBlockEnd: '16rem' }}>
				<Story />
			</div>
		),
	],
};

const Template = (args) => <MenuButtonComponent {...args} />;

export const MenuButton = Template.bind({});
MenuButton.args = {
	label: 'Menu trigger label',
	menuItems: sampleMenuItems,
};
