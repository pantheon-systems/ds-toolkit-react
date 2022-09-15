import ButtonComponent from './Button';
import DocsDescription from './Button.docs.md';

export default {
	title: 'Components/Button',
	component: ButtonComponent,
	parameters: {
		componentSubtitle: 'A component used to render a button',
		docs: {
			description: {
				component: DocsDescription,
			},
		},
	},
	argTypes: {},
};

const Template = (args) => <ButtonComponent {...args} />;

export const Button = Template.bind({});
Button.args = {
	label: 'Button label',
};
