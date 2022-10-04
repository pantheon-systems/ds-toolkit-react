import PropTypes from 'prop-types';

import './stepper.css';

/**
 * Stepper UI component
 */
const Stepper = ({}) => {
	return (
		<div aria-label='progress' className='pds-stepper' data-steps='4'>
			<ol className='pds-stepper__steps'>
				<li className='pds-stepper__step pds-stepper__step--complete'>
					<div className='pds-stepper__step-indicator'>1</div>
					<div className='pds-stepper__step-label'>
						Step 1 Label
						<span className='sr-only'>Step 1 of 4, completed</span>
					</div>
				</li>
				<li
					className='pds-stepper__step pds-stepper__step--current'
					aria-current='step'
				>
					<div className='pds-stepper__step-indicator'>2</div>
					<div className='pds-stepper__step-label'>
						Step 2 Label
						<span className='sr-only'>Step 2 of 4</span>
					</div>
				</li>
				<li className='pds-stepper__step'>
					<div className='pds-stepper__step-indicator'>3</div>
					<div className='pds-stepper__step-label'>
						Step 3 Label
						<span className='sr-only'>Step 3 of 4, not completed</span>
					</div>
				</li>
				<li className='pds-stepper__step'>
					<div className='pds-stepper__step-indicator'>4</div>
					<div className='pds-stepper__step-label'>
						Step 4 Label
						<span className='sr-only'>Step 4 of 4, not completed</span>
					</div>
				</li>
			</ol>
		</div>
	);
};

Stepper.propTypes = {};

Stepper.defaultProps = {};

export default Stepper;
