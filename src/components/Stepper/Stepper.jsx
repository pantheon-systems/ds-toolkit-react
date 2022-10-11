import PropTypes from 'prop-types';

import { completedIcon, errorIcon } from './stepper-icons';

import './stepper.css';

/**
 * Stepper UI component
 */
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

		// Set classes.
		const stepClasses = ['pds-stepper__step'];
		if (currentStep) {
			stepClasses.push('pds-stepper__step--current');
		}
		if (isComplete) {
			stepClasses.push('pds-stepper__step--complete');
		}
		if (hasError) {
			stepClasses.push('pds-stepper__step--error');
		}

		// Set aria label.
		// TODO convert to translatable string.
		let ariaLabel = `Step ${stepNumber}`;
		if (isComplete) {
			ariaLabel = `Step ${stepNumber}, completed`;
		}

		// Set step contents.
		let stepContents = (
			<>
				<div aria-hidden='true' className='pds-stepper__step-indicator'>
					{hasError ? errorIcon : stepNumber}
				</div>
				<div className='pds-stepper__step-label'>{stepLabel}</div>
			</>
		);

		// If step isComplete, provide button to return to step.
		if (isComplete) {
			stepContents = (
				// TODO convert button label to translatable string.
				<button
					onClick={() => callback(step)}
					label={`Return to step ${stepNumber}`}
				>
					<div aria-hidden='true' className='pds-stepper__step-indicator'>
						{completedIcon}
					</div>
					<div className='pds-stepper__step-label'>{stepLabel}</div>
				</button>
			);
		}

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
		<div aria-label='progress' className='pds-stepper'>
			<ol className='pds-stepper__steps'>{renderSteps}</ol>
		</div>
	);
};

Stepper.propTypes = {
	/**
	 * An array of Steps.
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

Stepper.defaultProps = {};

export default Stepper;
