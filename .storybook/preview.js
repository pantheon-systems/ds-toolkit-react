import '../_dist/css/pantheon-core.css';

// Add viewports for our example device widths.
const deviceViewports = {
	phone: {
		name: 'Phone',
		styles: {
			width: '390px',
			height: '844px',
		},
	},
	phoneLarge: {
		name: 'Large Phone',
		styles: {
			width: '428px',
			height: '926px',
		},
	},
	tablet: {
		name: 'Tablet',
		styles: {
			width: '768px',
			height: '1024px',
		},
	},
	tabletLarge: {
		name: 'Large Tablet',
		styles: {
			width: '1024px',
			height: '1366px',
		},
	},
	desktop: {
		name: 'Desktop 1200',
		styles: {
			width: '1200px',
			height: '1024px',
		},
	},
	desktopWide: {
		name: 'Desktop 1440',
		styles: {
			width: '1440px',
			height: '1024px',
		},
	},
	desktopUltraWide: {
		name: 'Desktop 1600',
		styles: {
			width: '1600px',
			height: '1024px',
		},
	},
};

export const parameters = {
	actions: { argTypesRegex: '^on[A-Z].*' },
	controls: {
		expanded: true,
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
	options: {
		storySort: {
			method: 'alphabetical',
			order: ['Components', 'Layouts', '*'],
		},
	},
	viewport: {
		viewports: deviceViewports,
	},
};
