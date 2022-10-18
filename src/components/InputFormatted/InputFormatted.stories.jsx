import InputFormattedComponent from './InputFormatted';
import DocsDescription from './InputFormatted.docs.md';

export default {
	title: 'Components/Inputs/Formatted',
	component: InputFormattedComponent,
	parameters: {
		componentSubtitle:
			'A component to allow the input of text based data by a user that will be formatted in pre-determined ways (credit card, phone number, etc).',
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

const Template = (args) => <InputFormattedComponent {...args} />;

export const InputFormattedCreditCard = Template.bind({});
InputFormattedCreditCard.args = {
	id: 'pds-sample-input-credit-card',
	label: 'Credit Card Number',
	formatting: 'credit-card',
};
InputFormattedCreditCard.storyName = 'Credit Card';

export const InputFormattedPhoneUS = Template.bind({});
InputFormattedPhoneUS.args = {
	id: 'pds-sample-input-phone-us',
	label: 'Phone Number',
	formatting: 'phone-us',
};
InputFormattedPhoneUS.storyName = 'Phone Number (USA/CA)';

export const InputFormattedLocalizedNumber = Template.bind({});
InputFormattedLocalizedNumber.args = {
	id: 'pds-sample-input-number-localized',
	label: 'Number',
	formatting: 'number-localized',
};
InputFormattedLocalizedNumber.storyName = 'Localized Number';
