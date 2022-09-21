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
		variant: 'equal',
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
			Item 1
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
	</TwoItemLayoutComponent>
);

export const TwoItemLayout = Template.bind({});
