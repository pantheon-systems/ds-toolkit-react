export const dialogMsgBase = `Navigated to step => `;

const sampleCallback = (item) => {
	window.alert(`${dialogMsgBase}${item.label}`);
};

export const threeSteps = [
	{
		label: 'Part A',
		callback: sampleCallback,
	},
	{
		label: 'Part B has a longer label than the others',
		callback: sampleCallback,
		isCurrent: true,
	},
	{
		label: 'Part C',
		callback: sampleCallback,
	},
];

export const threeStepsWithError = [
	{
		label: 'Part A',
		callback: sampleCallback,
	},
	{
		label: 'Part B',
		callback: sampleCallback,
		isCurrent: true,
		hasError: true,
	},
	{
		label: 'Part C',
		callback: sampleCallback,
	},
];

export const fourSteps = [
	{
		label: 'Part A',
		callback: sampleCallback,
	},
	{
		label: 'Part B has a longer label than the others',
		callback: sampleCallback,
	},
	{
		label: 'Part C',
		callback: sampleCallback,
		isCurrent: true,
	},
	{
		label: 'Part D',
		callback: sampleCallback,
	},
];

export const fiveSteps = [
	{
		label: 'Part A',
		callback: sampleCallback,
	},
	{
		label: 'Part B',
		callback: sampleCallback,
	},
	{
		label: 'Part C',
		callback: sampleCallback,
		isCurrent: true,
	},
	{
		label: 'Part D has a longer label than the others',
		callback: sampleCallback,
	},
	{
		label: 'Part E',
		callback: sampleCallback,
	},
];
