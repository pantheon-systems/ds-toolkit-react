import RadioGroupComponent from './RadioGroup';
import DocsDescription from './RadioGroup.docs.md';

import { IconMasterCard } from './_story/icon-mastercard';

export default {
	title: 'Components/Inputs/Radio Group',
	component: RadioGroupComponent,
	parameters: {
		componentSubtitle:
			'A component to show a group of options allowing a user to select only one option',
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

const Template = (args) => <RadioGroupComponent {...args} />;

export const RadioGroup = Template.bind({});
RadioGroup.args = {
	id: 'input-alpha',
	label: 'Select one option',
	options: [
		{
			id: 'input-alpha-option-1',
			label: 'Option 1',
			value: 'option-1',
		},
		{
			id: 'input-alpha-option-2',
			label: 'Option 2',
			value: 'option-2',
		},
		{
			id: 'input-alpha-option-3',
			label: 'Option 3',
			value: 'option-3',
		},
	],
};
RadioGroup.storyName = 'Radio Group';
