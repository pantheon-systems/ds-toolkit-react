import CardComponent from './Card';
import DocsDescription from './Card.docs.md';

export default {
	title: 'Components/Card',
	component: CardComponent,
	parameters: {
		componentSubtitle:
			'A component <add description here>',
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
	},
	decorators: [
	],
};

const Template = (args) => <CardComponent {...args} />;

export const Card = Template.bind({});
Card.args = {
};
Card.storyName = 'Card';