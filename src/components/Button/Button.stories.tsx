import { ComponentStory, ComponentMeta } from '@storybook/react';

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
} as ComponentMeta<typeof ButtonComponent>;

const Template: ComponentStory<typeof ButtonComponent> = (args) => (
	<ButtonComponent {...args} />
);

export const Button = Template.bind({});
Button.args = {
	label: 'Button label',
	disabled: false,
};
