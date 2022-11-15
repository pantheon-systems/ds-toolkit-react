import NavGlobalComponent from './NavGlobal';
import DocsDescription from './NavGlobal.docs.md';

import { sampleNavItems } from './nav-global-sample-data';

export default {
	title: 'Components/Nav Global',
	component: NavGlobalComponent,
	parameters: {
		componentSubtitle: 'A component <add description here>',
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

const Template = (args) => <NavGlobalComponent {...args} />;

export const NavGlobal = Template.bind({});
NavGlobal.args = {
	navItems: sampleNavItems,
};
NavGlobal.storyName = 'Nav Global';
