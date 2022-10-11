import InputTextComponent from './InputText';
import DocsDescription from './InputText.docs.md';

export default {
	title: 'Components/Inputs/Text',
	component: InputTextComponent,
	parameters: {
		componentSubtitle:
			'A component to allow the input of text based data by a user.',
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

const Template = (args) => <InputTextComponent {...args} />;

export const InputText = Template.bind({});
InputText.args = {
	id: 'pds-sample-input-name',
	label: 'Name',
};
InputText.storyName = 'Default';
InputText.parameters = {
	controls: { sort: 'requiredFirst' },
};

export const InputTextExampleCounter = Template.bind({});
InputTextExampleCounter.args = {
	id: 'pds-sample-input-name-counter',
	label: 'Description',
	counterFunction: (value) => {
		const maxChars = 100;

		return `${value.length}/${maxChars}`;
	},
};
InputTextExampleCounter.storyName = 'Using a Counter Function';

export const InputTextExampleValidation = Template.bind({});
InputTextExampleValidation.args = {
	id: 'pds-sample-input-name-validation',
	label: 'Greek letter',
	validationFunction: (value) => {
		const validValues = ['alpha', 'beta', 'gamma'];

		// if input value is not a permitted Greek letter
		if (!validValues.includes(value.toLowerCase()) && value.length > 0) {
			return {
				error: true,
				message: 'Please enter one of the first three Greek letters.',
			};
		}

		if (validValues.includes(value.toLowerCase()) && value.length > 0) {
			return {
				success: true,
			};
		}
	},
};
InputTextExampleValidation.storyName = 'Using a Validation Function';
