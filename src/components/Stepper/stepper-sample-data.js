export const dialogMsgBase = `Navigated to step => `;

const sampleCallback = (item) => {
	window.alert(`${dialogMsgBase}${item.label}`);
};

export const sampleSteps = [
	{
		label: 'Step A',
		callback: sampleCallback,
	},
	{
		label: 'Step B',
		callback: sampleCallback,
	},
	{
		label: 'Step C',
		callback: sampleCallback,
		isCurrent: true,
	},
	{
		label: 'Step D',
		callback: sampleCallback,
	},
	{
		label: 'Step E',
		callback: sampleCallback,
	},
];

export const sampleStepsWithError = [
	{
		label: 'Step A',
		callback: sampleCallback,
	},
	{
		label: 'Step B',
		callback: sampleCallback,
	},
	{
		label: 'Step C',
		callback: sampleCallback,
		isCurrent: true,
		hasError: true,
	},
	{
		label: 'Step D',
		callback: sampleCallback,
	},
	{
		label: 'Step E',
		callback: sampleCallback,
	},
];
