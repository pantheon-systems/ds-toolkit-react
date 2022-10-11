import StepperComponent from './Stepper';
import DocsDescription from './Stepper.docs.md';

import {
	threeSteps,
	threeStepsWithError,
	fourSteps,
	fiveSteps,
} from './stepper-sample-data';

export default {
	title: 'Components/Stepper',
	component: StepperComponent,
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
	argTypes: {
		steps: {
			description: 'Sample data sets for stepper steps.',
			options: Object.keys({
				threeSteps,
				threeStepsWithError,
				fourSteps,
				fiveSteps,
			}),
			mapping: { threeSteps, threeStepsWithError, fourSteps, fiveSteps },
			control: {
				type: 'select',
				labels: {
					threeSteps: 'Three steps',
					threeStepsWithError: 'Three steps with an error',
					fourSteps: 'Four steps',
					fiveSteps: 'Five steps',
				},
			},
		},
	},
};

const Template = (args) => <StepperComponent {...args} />;

export const Stepper = Template.bind({});
Stepper.args = { steps: threeSteps };
