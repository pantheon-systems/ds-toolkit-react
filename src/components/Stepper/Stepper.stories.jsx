import StepperComponent from './Stepper';
import DocsDescription from './Stepper.docs.md';

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
	argTypes: {},
	decorators: [],
};

const Template = (args) => <StepperComponent {...args} />;

export const Stepper = Template.bind({});
Stepper.args = {};
Stepper.storyName = 'Stepper';
