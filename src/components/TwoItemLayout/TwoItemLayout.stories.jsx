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
		<div
			slot='first-item'
			style={{
				backgroundColor: 'PaleTurquoise',
				padding: '1rem',
				textAlign: 'center',
			}}
		>
			Item 1a
		</div>
		<div
			slot='first-item'
			style={{
				backgroundColor: 'pink',
				padding: '1rem',
				textAlign: 'center',
			}}
		>
			Item 1b
		</div>
		<div
			slot='second-item'
			style={{
				backgroundColor: 'PaleTurquoise',
				padding: '1rem',
				textAlign: 'center',
			}}
		>
			Item 2
		</div>
		<div>Item 3 (no slot, will not render)</div>
	</TwoItemLayoutComponent>
);

export const TwoItemLayout = Template.bind({});
