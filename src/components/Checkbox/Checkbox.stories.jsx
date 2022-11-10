import CheckboxComponent from './Checkbox';
import DocsDescription from './Checkbox.docs.md';

export default {
	title: 'Components/Inputs/Checkbox',
	component: CheckboxComponent,
	parameters: {
		componentSubtitle:
			'A component allowing the user to make a boolean selection',
		docs: {
			description: {
				component: DocsDescription,
			},
			source: {
				excludeDecorators: true,
			},
		},
	},
	argTypes: {
		indeterminate: {
			table: {
				disable: true,
			},
		},
	},
	decorators: [],
};

const Template = (args) => <CheckboxComponent {...args} />;

export const Checkbox = Template.bind({});
Checkbox.args = {
	id: 'pds-sample-checkbox',
	label: 'Yes, I confirm this selection',
};
Checkbox.storyName = 'Checkbox';
