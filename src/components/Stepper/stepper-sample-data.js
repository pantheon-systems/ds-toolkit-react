export const dialogMsgBase = `Navigated to step => `;

const sampleCallback = (item) => {
	window.alert(`${dialogMsgBase}${item.label}`);
};

export const threeSteps = [
	{
		label: 'Step A',
		callback: sampleCallback,
	},
	{
		label: 'Step B',
		callback: sampleCallback,
		isCurrent: true,
	},
	{
		label: 'Step C',
		callback: sampleCallback,
	},
];

export const threeStepsWithError = [
	{
		label: 'Step A',
		callback: sampleCallback,
	},
	{
		label: 'Step B',
		callback: sampleCallback,
		isCurrent: true,
		hasError: true,
	},
	{
		label: 'Step C',
		callback: sampleCallback,
	},
];

export const fourSteps = [
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
];

export const fiveSteps = [
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
