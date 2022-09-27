import ButtonSplitComponent from './ButtonSplit';
import DocsDescription from './ButtonSplit.docs.md';

import { sampleActionItems } from './button-split-sample-data';

export default {
	title: 'Components/Button Split',
	component: ButtonSplitComponent,
	parameters: {
		componentSubtitle:
			'A component used to render a button with a primary action and a menu of additional options',
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
		(Story) => (
			<div style={{ marginBlockEnd: '10rem' }}>
				<Story />
			</div>
		),
	],
};

const Template = (args) => <ButtonSplitComponent {...args} />;

export const ButtonSplit = Template.bind({});
ButtonSplit.args = {
	menuItems: sampleActionItems,
};
ButtonSplit.storyName = 'Button Split';
