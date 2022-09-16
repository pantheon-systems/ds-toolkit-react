export const dialogMsgBase = `Activated menu item => `;

const sampleCallback = (item) => {
	window.alert(`${dialogMsgBase}${item.label}`);
};

export const sampleMenuItems = [
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

export const sampleSimpleMenuItems = [
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
