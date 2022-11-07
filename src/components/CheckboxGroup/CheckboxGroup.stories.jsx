import CheckboxGroupComponent from './CheckboxGroup';
import DocsDescription from './CheckboxGroup.docs.md';

export default {
	title: 'Components/Inputs/Checkbox Group',
	component: CheckboxGroupComponent,
	parameters: {
		componentSubtitle:
			'A component where a user can select one or more items from a limited number of choices',
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

const Template = (args) => <CheckboxGroupComponent {...args} />;

export const CheckboxGroup = Template.bind({});
CheckboxGroup.args = {
	id: 'pds-sample-checkbox-group',
	label: 'Select options',
	options: [
		{
			label: 'Alpha',
			value: 'alpha',
			checked: true,
		},
		{
			label: 'Beta',
			value: 'beta',
			checked: true,
		},
		{
			label: 'Gamma',
			value: 'gamma',
		},
		{
			label: 'Delta',
			value: 'delta',
		},
		{
			label: 'Epsilon',
			value: 'epsilon',
			disabled: true,
		},
	],
};
CheckboxGroup.storyName = 'Checkbox Group';
