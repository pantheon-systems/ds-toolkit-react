import PropTypes from 'prop-types';
import React from 'react';

import './layout-global.css';

/**
 * LayoutGlobal UI component
 */
const LayoutGlobal = ({ children, hasSecondaryMainNav }) => {
	// Establish slots.
	const slots = {};
	React.Children.forEach(children, (child) => {
		const slotName = child?.props.slot;
		if (slotName) {
			if (slots[slotName]) {
				slots[slotName].push(child);
			} else {
				slots[slotName] = [child];
			}
		}
	});

	// Assign content to named slots for this component.
	const mainNav = slots['main-nav'];
	const mainContentHeader = slots['main-content-header'];
	const mainContent = slots['main-content'];

	//
	const cssGlobal = [
		'pds-layout-global',
		'pds-grid',
		hasSecondaryMainNav ? 'pds-layout-global--has-secondary-nav' : '',
	];

	const cssSections = {
		mainNav: [
			'pds-grid-item',
			hasSecondaryMainNav
				? 'pds-grid-item--lg-2 pds-grid-item--md-2'
				: 'pds-grid-item--lg-1 pds-grid-item--md-1',
		],
		mainContent: [
			'pds-grid-item',
			hasSecondaryMainNav
				? 'pds-grid-item--lg-10 pds-grid-item--md-4'
				: 'pds-grid-item--lg-11 pds-grid-item--md-5',
		],
	};

	//
	// Render the output
	return (
		<>
			<a href='#main-content' className='pds-global-layout__skip-link'>
				Skip to main content
			</a>

			<div className={cssGlobal.join(' ').trim()}>
				<section
					id='main-navigation'
					className={cssSections.mainNav.join(' ').trim()}
				>
					{mainNav}
				</section>

				<main
					id='main-content'
					className={cssSections.mainContent.join(' ').trim()}
				>
					<header id='main-content__header'>{mainContentHeader}</header>

					{mainContent}
				</main>
			</div>
		</>
	);
};

//
// Prop types

//
// Component propType definitions
LayoutGlobal.propTypes = {
	hasSecondaryMainNav: PropTypes.bool,
};

LayoutGlobal.defaultProps = {
	hasSecondaryMainNav: false,
};

//
export default LayoutGlobal;
