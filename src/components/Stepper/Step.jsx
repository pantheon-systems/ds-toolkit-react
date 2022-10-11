import PropTypes from 'prop-types';

import { completedIcon, errorIcon } from './stepper-icons';

import './stepper.css';

/**
 * Step Sub-component for Stepper
 */
const Step = ({
	label,
	isCurrent,
	isComplete,
	hasError,
	stepNum,
	totalSteps,
	path,
}) => {
	// Set up classes.
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
	let ariaLabel = `Step ${stepNum}`;
	if (isComplete) {
		ariaLabel = `Step ${stepNum}, completed`;
	}

	// Set step contents.
	let stepContents = (
		<>
			<div aria-hidden='true' className='pds-stepper__step-indicator'>
				{hasError && isCurrent ? errorIcon : stepNum}
			</div>
			<div className='pds-stepper__step-label'>{label}</div>
		</>
	);

	// If step isComplete, step should become navigable.
	if (isComplete) {
		stepContents = (
			<a href={path}>
				<div aria-hidden='true' className='pds-stepper__step-indicator'>
					{completedIcon}
				</div>
				<div className='pds-stepper__step-label'>{label}</div>
			</a>
		);
	}

	return (
		<li
			aria-label={ariaLabel}
			aria-posinset={stepNum}
			aria-setsize={totalSteps}
			aria-current={isCurrent ? 'step' : undefined}
			className={stepClasses.join(' ').trim()}
		>
			{stepContents}
		</li>
	);
};

Step.propTypes = {
	/**
	 * The step label.
	 */
	label: PropTypes.string.isRequired,
	/**
	 * Is this the current step?
	 */
	isCurrent: PropTypes.bool,
	/**
	 * Has this step been completed?
	 */
	isComplete: PropTypes.bool,
	/**
	 * Is there an error on this step?
	 */
	hasError: PropTypes.bool,
	/**
	 * What is the sequential number of this step?
	 */
	stepNum: PropTypes.oneOf([1, 2, 3, 4, 5]).isRequired,
	/**
	 * Total number of steps.
	 */
	totalSteps: PropTypes.oneOf([1, 2, 3, 4, 5]).isRequired,
	/**
	 * Location of form associated with step.
	 */
	path: PropTypes.string.isRequired,
};

Step.defaultProps = {};

export default Step;
