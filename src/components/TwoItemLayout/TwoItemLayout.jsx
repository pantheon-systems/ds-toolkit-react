import PropTypes from 'prop-types';
import React from 'react';

import './two-item-layout.css';
import '../../utilities/grid/grid.css';

/**
 * Two Item Layout component
 */

const TwoItemLayout = ({ variant, children }) => {
	// Pre-defined class arrays based on column width.
	const halfClasses = [
		'pds-grid-item--sm-4',
		'pds-grid-item--md-3',
		'pds-grid-item--lg-6',
	].join(' ');
	const oneThirdClasses = [
		'pds-grid-item--sm-4',
		'pds-grid-item--md-2',
		'pds-grid-item--lg-4',
	].join(' ');
	const twoThirdsClasses = [
		'pds-grid-item--sm-4',
		'pds-grid-item--md-4',
		'pds-grid-item--lg-8',
	].join(' ');

	// Base class arrays for each item.
	const firstItemClasses = ['pds-grid-item'];
	const secondItemClasses = ['pds-grid-item'];

	// Alter class arrays based on variant.
	switch (variant) {
		case 'equal':
			firstItemClasses.push(halfClasses);
			secondItemClasses.push(halfClasses);
			break;
		case 'one-third-start':
			firstItemClasses.push(oneThirdClasses);
			secondItemClasses.push(twoThirdsClasses);
			break;
		case 'one-third-end':
			firstItemClasses.push(twoThirdsClasses);
			secondItemClasses.push(oneThirdClasses);
	}

	// Establish content slots.
	const slots = {};
	React.Children.forEach(children, (child) => {
		slots[child.props.slot] = React.cloneElement(child, {});
	});

	const firstItem = slots['first-item'];
	const secondItem = slots['second-item'];

	return (
		<div className='pds-grid pds-two-item-layout'>
			<div className={firstItemClasses.join(' ').trim()}>{firstItem}</div>
			<div className={secondItemClasses.join(' ').trim()}>{secondItem}</div>
		</div>
	);
};

TwoItemLayout.propTypes = {
	/**
	 * Layout variant for column widths.
	 */
	variant: PropTypes.oneOf(['equal', 'one-third-start', 'one-third-end']),
	/**
	 * Item content.
	 */
	children: PropTypes.node,
};

TwoItemLayout.defaultProps = {
	variant: 'equal',
};

export default TwoItemLayout;
