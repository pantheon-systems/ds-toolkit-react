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
	argTypes: {
		children: {
			table: {
				disable: true,
			},
		},
	},
	decorators: [
		(Story) => (
			<div style={{ margin: '0 1rem 1rem' }}>
				<Story />
			</div>
		),
	],
};

const Template = (args) => <CardComponent {...args} />;

export const Card = Template.bind({});
Card.args = {
	children: [
		<h3>Sample Card Data</h3>,
		<p>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
			tempor incididunt ut labore et dolore magna aliqua. Vitae et leo duis ut
			diam quam nulla porttitor massa. Facilisi morbi tempus iaculis urna id.
		</p>,
	],
};
Card.storyName = 'Card';
