import TwoItemLayoutComponent from './TwoItemLayout';
import TwoItemLayoutDescription from './TwoItemLayout.docs.md';

export default {
	title: 'Components/Two Item Layout',
	component: TwoItemLayoutComponent,
	parameters: {
		componentSubtitle: 'A layout container with two items',
		docs: {
			description: {
				component: TwoItemLayoutDescription,
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
	args: {
		layoutVariant: 'equal',
	},
};

const Template = (args) => (
	<TwoItemLayoutComponent {...args}>
		<SampleCard slot='first-item' />
		<SampleBlock slot='second-item' />
		<p slot='second-item'>
			Paragraph tag. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
		</p>
		<div>No slot, will not render.</div>
	</TwoItemLayoutComponent>
);

export const TwoItemLayout = Template.bind({});

// Sample components for stories.
const SampleBlock = () => {
	return (
		<div
			style={{
				backgroundColor: 'LightGray',
				padding: '1rem',
				marginBlockEnd: '1rem',
			}}
		>
			Sample item component
		</div>
	);
};
const SampleCard = () => {
	return (
		<div
			style={{
				border: '1px solid LightGray',
				padding: '1rem 1.5rem 0',
			}}
		>
			<p>
				Sample card component. Lorem ipsum dolor sit amet, consectetur
				adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
				magna aliqua. Vitae et leo duis ut diam quam nulla porttitor massa.
				Facilisi morbi tempus iaculis urna id.
			</p>
		</div>
	);
};
