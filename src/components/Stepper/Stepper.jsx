import PropTypes from 'prop-types';

import { completedIcon, errorIcon } from './stepper-icons';

import './stepper.css';

/**
 * Stepper UI component
 */
const Stepper = ({ steps }) => {
	// Find current step.
	const currentStep = steps.findIndex((step) => step.isCurrent);

	// Function to render each step.
	const renderSteps = steps.map((step, index) => {
		const stepLabel = step.label;
		const stepNumber = index + 1;
		const totalSteps = steps.length;
		const isCurrent = step.isCurrent;
		const isComplete = index < currentStep;
		const hasError = step.hasError;
		const path = step.path;

		// Set classes.
		const stepClasses = ['pds-stepper__step'];
		if (isCurrent) {
			stepClasses.push('pds-stepper__step--current');
		}
		if (isComplete) {
			stepClasses.push('pds-stepper__step--complete');
		}
		if (hasError && isCurrent) {
			stepClasses.push('pds-stepper__step--error');
		}

		// Set aria label.
		// TODO: convert to translatable string
		let ariaLabel = `Step ${stepNumber}`;
		if (isComplete) {
			ariaLabel = `Step ${stepNumber}, completed`;
		}

		// Set step contents.
		let stepContents = (
			<>
				<div aria-hidden='true' className='pds-stepper__step-indicator'>
					{hasError && isCurrent ? errorIcon : stepNumber}
				</div>
				<div className='pds-stepper__step-label'>{stepLabel}</div>
			</>
		);

		// If step isComplete, step should become navigable.
		if (isComplete) {
			stepContents = (
				<a href={path}>
					<div aria-hidden='true' className='pds-stepper__step-indicator'>
						{completedIcon}
					</div>
					<div className='pds-stepper__step-label'>{stepLabel}</div>
				</a>
			);
		}

		return (
			<li
				key={index}
				aria-label={ariaLabel}
				aria-posinset={stepNumber}
				aria-setsize={totalSteps}
				aria-current={isCurrent ? 'step' : undefined}
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
			 * Location of form associated with step.
			 */
			path: PropTypes.string.isRequired,
		}),
	),
};

Stepper.defaultProps = {};

export default Stepper;
