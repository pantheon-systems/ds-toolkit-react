import CardComponent from './Card';
import DocsDescription from './Card.docs.md';

export default {
	title: 'Components/Card',
	component: CardComponent,
	parameters: {
		componentSubtitle: 'A component used to group related content',
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
	decorators: [
		(Story) => (
			<div style={{ margin: '1rem 1.5rem' }}>
				<Story />
			</div>
		),
	],
};

const Template = (args) => <CardComponent {...args} />;

export const Card = Template.bind({});
Card.args = {
	children: `Sample Card data. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
};
Card.storyName = 'Card';
