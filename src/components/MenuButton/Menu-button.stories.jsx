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
};

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

const sampleCallback = (item) => {
	window.alert(`Activated menu item => ${item.label}`);
};

const sampleMenuItems = [
	{
		label: 'Business options',
		isHeading: true,
	},
	{
		label: 'Alpha item',
		callback: sampleCallback,
	},
	{
		label: 'Beta item',
		callback: sampleCallback,
	},
	{
		isSeparator: true,
	},
	{
		label: 'Gamma item',
		callback: sampleCallback,
	},
	{
		label: 'Epsilon item',
		callback: sampleCallback,
	},
	{
		label: 'Corporate options',
		isHeading: true,
	},
	{
		label: 'Alpha item',
		callback: sampleCallback,
	},
	{
		label: 'Beta item',
		callback: sampleCallback,
	},
	{
		label: 'Gamma item',
		callback: sampleCallback,
	},
];

const sampleSimpleMenuItems = [
	{
		label: 'Alpha item',
		callback: sampleCallback,
	},
	{
		label: 'Beta item',
		callback: sampleCallback,
	},
	{
		label: 'Gamma item',
		callback: sampleCallback,
	},
	{
		label: 'Epsilon item',
		callback: sampleCallback,
	},
	{
		label: 'Alpha item',
		callback: sampleCallback,
	},
	{
		label: 'Beta item',
		callback: sampleCallback,
	},
	{
		label: 'Gamma item',
		callback: sampleCallback,
	},
];

const Template = (args) => (
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
	icon: { icon: sampleIcon, position: 'end' },
	menuItems: sampleMenuItems,
};
