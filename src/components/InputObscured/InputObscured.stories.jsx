import InputObscuredComponent from './InputObscured';
import DocsDescription from './InputObscured.docs.md';

export default {
	title: 'Components/Inputs/Obscured',
	component: InputObscuredComponent,
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

const Template = (args) => <InputObscuredComponent {...args} />;

export const InputObscured = Template.bind({});
InputObscured.args = {
	id: 'pds-input-obscured-sample',
	label: 'Password',
};
InputObscured.storyName = 'Default';

export const WithCounterFunction = Template.bind({});
WithCounterFunction.args = {
	id: 'pds-input-obscured-sample-counter',
	label: 'Password',
	counterFunction: (value) => {
		const maxChars = 100;

		return `${value.length}/${maxChars}`;
	},
};
WithCounterFunction.storyName = 'Using a Counter Function';

export const WithValidationFunction = Template.bind({});
WithValidationFunction.args = {
	id: 'pds-input-obscured-sample-validation',
	label: 'Password',
	validationFunction: (value) => {
		const maxLength = 10;
		const disallowedCharacters = ['*', '@'];

		// if input value is not a permitted length
		if (value.length > maxLength) {
			return {
				error: true,
				message: `Please enter a password with no more than ${maxLength} characters.`,
			};
		}

		// if input value contains disallowed characters
		const regex = new RegExp(`[${disallowedCharacters.join('|')}]`, 'g');
		if (value.match(regex)) {
			return {
				error: true,
				message: `Please enter a password that does not include the following characters: ${disallowedCharacters.join(
					', ',
				)}.`,
			};
		}
	},
};
WithValidationFunction.storyName = 'Using a Validation Function';
