import PropTypes from 'prop-types';

import './nav-global.css';

/**
 * NavGlobal UI component
 */
const NavGlobal = ({ navItems, currentPath }) => {
	//
	// Render the output
	return (
		<nav className='pds-nav-global'>
			<div className='pds-nav-global__workspace-selector'></div>

			<ul className='pds-nav-global__navigation'>
				{navItems.map((item, idx) => {
					const isActiveCSS = item.url === currentPath ? ' pds-current' : '';

					const itemCSS = `pds-nav-global__navigation-item${isActiveCSS}`;

					return (
						<li key={`pds-nav-global__item-${idx}`}>
							<a href={item.url} className={itemCSS} onClick={item.onClick}>
								{item.icon}
								{item.label}
							</a>
						</li>
					);
				})}
			</ul>
		</nav>
	);
};

//
// Prop types

//
// Component propType definitions
NavGlobal.propTypes = {
	/**
	 * Navigation items
	 */
	navItems: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string.isRequired,
			url: PropTypes.string,
			icon: PropTypes.node,
			onClick: PropTypes.func,
		}),
	),
	/**
	 * Current active path
	 */
	currentPath: PropTypes.string,
};

NavGlobal.defaultProps = {};

//
export default NavGlobal;
