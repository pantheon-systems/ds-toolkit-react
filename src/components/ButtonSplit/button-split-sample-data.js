export const dialogMsgBase = `Activated action => `;

const sampleCallback = (item) => {
	window.alert(`${dialogMsgBase}${item.label}`);
};

export const sampleActionItems = [
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
];
