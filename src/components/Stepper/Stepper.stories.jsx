import StepperComponent from './Stepper';
import DocsDescription from './Stepper.docs.md';

import Step from './Step';

import { sampleSteps, sampleStepsWithError } from './stepper-sample-data';

export default {
	title: 'Components/Stepper',
	component: StepperComponent,
	subcomponents: { Step },
	parameters: {
		componentSubtitle:
			'A component used to show progress during a multi-step process',
		docs: {
			description: {
				component: DocsDescription,
			},
			source: {
				excludeDecorators: true,
			},
		},
	},
	argTypes: {},
};

const Template = (args) => <StepperComponent {...args} />;

export const Stepper = Template.bind({});
Stepper.args = { steps: sampleSteps };
Stepper.storyName = 'Stepper';

export const StepperError = Template.bind({});
StepperError.args = { steps: sampleStepsWithError };
StepperError.storyName = 'Stepper with Error';
