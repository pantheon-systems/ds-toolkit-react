import PropTypes from 'prop-types';
import React from 'react';

import './two-item-layout.css';
import '../../utilities/grid/grid.css';

/**
 * Two Item Layout component
 */

const TwoItemLayout = ({ layoutVariant, children }) => {
	// Pre-defined class arrays based on column width.
	const halfClasses = [
		'pds-grid-item--sm-4',
		'pds-grid-item--md-3',
		'pds-grid-item--lg-6',
	];
	const oneThirdClasses = [
		'pds-grid-item--sm-4',
		'pds-grid-item--md-2',
		'pds-grid-item--lg-4',
	];
	const twoThirdsClasses = [
		'pds-grid-item--sm-4',
		'pds-grid-item--md-4',
		'pds-grid-item--lg-8',
	];

	// Base classes array.
	const baseClasses = ['pds-grid-item'];

	// Establish vars for each item's classes array.
	let firstItemClasses;
	let secondItemClasses;

	// Alter items' class arrays based on layoutVariant.
	switch (layoutVariant) {
		case 'equal':
			firstItemClasses = baseClasses.concat(halfClasses);
			secondItemClasses = baseClasses.concat(halfClasses);
			break;
		case 'one-third-start':
			firstItemClasses = baseClasses.concat(oneThirdClasses);
			secondItemClasses = baseClasses.concat(twoThirdsClasses);
			break;
		case 'one-third-end':
			firstItemClasses = baseClasses.concat(twoThirdsClasses);
			secondItemClasses = baseClasses.concat(oneThirdClasses);
	}

	// Establish slots.
	const slots = {};
	React.Children.forEach(children, (child) => {
		const slotName = child.props.slot;
		if (slotName) {
			if (slots[slotName]) {
				slots[slotName].push(child);
			} else {
				slots[slotName] = [child];
			}
		}
	});

	// Assign content to named slots for this component.
	const firstItemContent = slots['first-item'];
	const secondItemContent = slots['second-item'];

	return (
		<div className='pds-grid pds-two-item-layout'>
			<div className={firstItemClasses.join(' ').trim()}>
				{firstItemContent}
			</div>
			<div className={secondItemClasses.join(' ').trim()}>
				{secondItemContent}
			</div>
		</div>
	);
};

TwoItemLayout.propTypes = {
	/**
	 * Layout variant for column widths.
	 */
	layoutVariant: PropTypes.oneOf(['equal', 'one-third-start', 'one-third-end']),
	/**
	 * Item content.
	 */
	children: PropTypes.node,
};

TwoItemLayout.defaultProps = {
	layoutVariant: 'equal',
};

export default TwoItemLayout;
