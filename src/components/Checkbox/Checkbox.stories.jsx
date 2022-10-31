import CheckboxComponent from './Checkbox';
import DocsDescription from './Checkbox.docs.md';

export default {
	title: 'Components/Inputs/Checkbox',
	component: CheckboxComponent,
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

const Template = (args) => <CheckboxComponent {...args} />;

export const Checkbox = Template.bind({});
Checkbox.args = {
	label: 'Alpha',
	id: 'pds-sample-checkbox-alpha',
	name: 'alpha',
};
Checkbox.storyName = 'Checkbox';
