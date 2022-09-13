import { ComponentStory, ComponentMeta } from '@storybook/react';

import MenuButtonComponent from './Menu-button';
import DocsDescription from './Menu-button.docs.md';

export default {
	title: 'Components/Menu Button',
	component: MenuButtonComponent,
	parameters: {
		componentSubtitle: 'A component used to render a button that opens a menu',
		docs: {
			description: {
				component: DocsDescription,
			},
		},
	},
	argTypes: {},
} as ComponentMeta<typeof MenuButtonComponent>;

const sampleIcon = (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		className='down'
		width='12'
		height='9'
		viewBox='0 0 12 9'
		key={`menu-button-icon-${Date.now()}`}
	>
		<polygon points='1 0, 11 0, 6 8'></polygon>
	</svg>
);

const sampleMenuItems = [
	{
		label: 'Business options',
		isHeading: true,
	},
	{
		label: 'Alpha item',
	},
	{
		label: 'Beta item',
	},
	{
		isSeparator: true,
	},
	{
		label: 'Gamma item',
	},
	{
		label: 'Epsilon item',
	},
	{
		label: 'Corporate options',
		isHeading: true,
	},
	{
		label: 'Alpha item',
	},
	{
		label: 'Beta item',
	},
	{
		label: 'Gamma item',
	},
];

const sampleSimpleMenuItems = [
	{
		label: 'Alpha item',
	},
	{
		label: 'Beta item',
	},
	{
		label: 'Gamma item',
	},
	{
		label: 'Epsilon item',
	},
	{
		label: 'Alpha item',
	},
	{
		label: 'Beta item',
	},
	{
		label: 'Gamma item',
	},
];

const Template: ComponentStory<typeof MenuButtonComponent> = (args) => (
	<div
		style={{ display: 'flex', width: '50%', justifyContent: 'space-between' }}
	>
		<MenuButtonComponent {...args} />
		<MenuButtonComponent
			{...args}
			label='Simple menu'
			menuItems={sampleSimpleMenuItems}
		/>
	</div>
);

export const MenuButton = Template.bind({});
MenuButton.args = {
	label: 'Menu trigger label',
	icon: { icon: sampleIcon<HTMLElement>, position: 'end' },
	menuItems: sampleMenuItems,
};
