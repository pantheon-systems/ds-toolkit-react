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

	// Alter items' class arrays based on variant.
	switch (variant) {
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

	// Establish content slots for 'first-item' and 'second-item'.
	// Children should be passed in with a slot prop like this: slot='slot-name'.
	let firstItemContent = [];
	let secondItemContent = [];

	React.Children.forEach(children, (child, index) => {
		if (child.props.slot) {
			const slotName = child.props.slot;
			switch (slotName) {
				case 'first-item':
					firstItemContent.push(child);
					break;
				case 'second-item':
					secondItemContent.push(child);
					break;
				default:
					console.log(`"${slotName}" is an invalid slot name.`);
			}
		}
	});

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
