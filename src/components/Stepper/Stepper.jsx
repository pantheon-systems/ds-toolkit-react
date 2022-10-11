import PropTypes from 'prop-types';
import Step from './Step';

import './stepper.css';

/**
 * Stepper UI component
 */
const Stepper = ({ steps }) => {
	const currentStep = steps.findIndex((step) => step.isCurrent);
	const stepElements = steps.map((step, index) => (
		<Step
			key={index}
			label={step.label}
			isCurrent={step.isCurrent}
			isComplete={index < currentStep}
			hasError={step.hasError}
			stepNum={index + 1}
			totalSteps={steps.length}
			path={step.path}
		/>
	));

	return (
		<div aria-label='progress' className='pds-stepper'>
			<ol className='pds-stepper__steps'>{stepElements}</ol>
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
