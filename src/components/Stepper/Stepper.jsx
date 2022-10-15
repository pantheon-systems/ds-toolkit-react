import PropTypes from 'prop-types';

import { completedIcon, errorIcon } from './stepper-icons';

import './stepper.css';

/**
 * Stepper UI component
 */

// Define min and max number of steps allowed.
const minStepCount = 3;
const maxStepCount = 5;

// Define className variables.
const stepperBaseClass = 'pds-stepper';
const stepsListClass = `${stepperBaseClass}__steps`;
const stepClass = {
	base: `${stepperBaseClass}__step`,
	// Step parts.
	content: `${stepperBaseClass}__step-content`,
	indicator: `${stepperBaseClass}__step-indicator`,
	label: `${stepperBaseClass}__step-label`,
	// Step states.
	current: `${stepperBaseClass}__step--current`,
	complete: `${stepperBaseClass}__step--complete`,
	error: `${stepperBaseClass}__step--error`,
};

const Stepper = ({ steps }) => {
	const currentStepIndex = steps.findLastIndex((step) => step.isCurrent);
	const totalSteps = steps.length;

	// Function to render each step.
	const renderSteps = steps.map((step, index) => {
		const stepNumber = index + 1;
		const currentStep = index === currentStepIndex;
		const isComplete = index < currentStepIndex;
		const hasError = step.hasError && currentStep;

		// Set step classes.
		const stepClasses = [stepClass.base];
		if (isComplete) {
			stepClasses.push(stepClass.complete);
		}
		if (currentStep) {
			stepClasses.push(stepClass.current);
		}
		if (hasError) {
			stepClasses.push(stepClass.error);
		}

		// Set aria label.
		// TODO convert to translatable string.
		let ariaLabel = `Step ${stepNumber}`;
		if (isComplete) {
			ariaLabel = `Step ${stepNumber}, completed`;
		}

		// Step indicator markup.
		const stepIndicator = (
			<div aria-hidden='true' className={stepClass.indicator}>
				{hasError ? errorIcon : undefined}
				{isComplete ? completedIcon : undefined}
				{!hasError && !isComplete ? stepNumber : undefined}
			</div>
		);

		// Step label markup.
		const stepLabel = <div className={stepClass.label}>{step.label}</div>;

		// Set step contents.
		// Default content for non-completed steps.
		let stepContents = (
			<div className={stepClass.content}>
				{stepIndicator}
				{stepLabel}
			</div>
		);

		// If step has been completed, provide button to return to that step.
		if (isComplete) {
			stepContents = (
				// TODO convert button label to translatable string.
				<button
					className={stepClass.content}
					onClick={() => step.callback(step)}
					label={`Return to step ${stepNumber}`}
				>
					{stepIndicator}
					{stepLabel}
				</button>
			);
		}

		// Render each step as a list item.
		return (
			<li
				key={index}
				aria-label={ariaLabel}
				aria-posinset={stepNumber}
				aria-setsize={totalSteps}
				aria-current={currentStep ? 'step' : undefined}
				className={stepClasses.join(' ').trim()}
			>
				{stepContents}
			</li>
		);
	});

	// Only return the component if it has an allowed number of steps.
	if (totalSteps >= minStepCount && totalSteps <= maxStepCount) {
		return (
			<div
				aria-label='progress'
				className={stepperBaseClass}
				data-steps={totalSteps}
			>
				<ol className={stepsListClass}>{renderSteps}</ol>
			</div>
		);
	}
};

Stepper.propTypes = {
	/**
	 * An array of Step objects.
	 */
	steps: PropTypes.arrayOf(
		PropTypes.shape({
			/**
			 * The step label.
			 */
			label: PropTypes.string.isRequired,
			/**
			 * Is this the current step?
			 */
			isCurrent: PropTypes.bool,
			/**
			 * Is there an error on this step?
			 */
			hasError: PropTypes.bool,
			/**
			 * Callback function to return to a previously completed step.
			 */
			callback: PropTypes.func,
		}),
	),
};

export default Stepper;
