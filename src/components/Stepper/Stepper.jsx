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
					Step 1 Label
					<span className='sr-only'>Step 1 of 4, completed</span>
				</li>
				<li
					className='pds-stepper__step pds-stepper__step--active'
					aria-current='step'
				>
					Step 2 Label
					<span className='sr-only'>Step 2 of 4</span>
				</li>
				<li className='pds-stepper__step'>
					Step 3 Label
					<span className='sr-only'>Step 3 of 4, not completed</span>
				</li>
				<li className='pds-stepper__step'>
					Step 4 Label
					<span className='sr-only'>Step 4 of 4, not completed</span>
				</li>
			</ol>
		</div>
	);
};

Stepper.propTypes = {};

Stepper.defaultProps = {};

export default Stepper;
