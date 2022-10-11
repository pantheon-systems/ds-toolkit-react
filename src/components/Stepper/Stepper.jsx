import PropTypes from 'prop-types';

import { completedIcon, errorIcon } from './stepper-icons';

import './stepper.css';

/**
 * Stepper UI component
 */

// Define className variables.
const stepperBaseClass = 'pds-stepper';
const stepsListClass = `${stepperBaseClass}__steps`;
const stepClass = {
	base: `${stepperBaseClass}__step`,
	current: `${stepperBaseClass}__step--current`,
	complete: `${stepperBaseClass}__step--complete`,
	error: `${stepperBaseClass}__step--error`,
	indicator: `${stepperBaseClass}__step-indicator`,
	label: `${stepperBaseClass}__step-label`,
};

const Stepper = ({ steps }) => {
	// Find index of current step.
	// Selects last item with `isCurrent` if more than one is designated in error.
	const currentStepIndex = steps.findLastIndex((step) => step.isCurrent);

	// Function to render each step.
	const renderSteps = steps.map((step, index) => {
		const stepLabel = step.label;
		const stepNumber = index + 1;
		const totalSteps = steps.length;
		const currentStep = index === currentStepIndex;
		const isComplete = index < currentStepIndex;
		const hasError = step.hasError && currentStep;
		const callback = step.callback;

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

		// Set step contents.
		// Default content for non-completed steps.
		let stepContents = (
			<>
				<div aria-hidden='true' className={stepClass.indicator}>
					{hasError ? errorIcon : stepNumber}
				</div>
				<div className={stepClass.label}>{stepLabel}</div>
			</>
		);

		// If step has been completed, provide button to return to step.
		if (isComplete) {
			stepContents = (
				// TODO convert button label to translatable string.
				<button
					onClick={() => callback(step)}
					label={`Return to step ${stepNumber}`}
				>
					<div aria-hidden='true' className={stepClass.indicator}>
						{completedIcon}
					</div>
					<div className={stepClass.label}>{stepLabel}</div>
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

	return (
		<div aria-label='progress' className={stepperBaseClass}>
			<ol className={stepsListClass}>{renderSteps}</ol>
		</div>
	);
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
