const AxeBuilder = require('@axe-core/playwright').default;
const axeReporter = require('axe-html-reporter').createHtmlReport;

const a11yTest = async (page, storyID) => {
	let a11yNumViolations = 0;

	try {
		const axeResults = await new AxeBuilder({ page })
			.exclude('iframe')
			.options({
				runOnly: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'],
				checks: { reporter: 'no-passes' },
			})
			.include('#root')
			.analyze();

		a11yNumViolations = axeResults.violations.length;

		if (a11yNumViolations > 0) {
			axeReporter({
				results: axeResults,
				options: {
					projectKey: 'PDS',
					outputDir: '__tests__/a11y/results',
					reportFileName: `${storyID}.html`,
				},
			});
		}
	} catch (e) {
		// do something with the error
		throw Error(e);
	}

	return a11yNumViolations;
};

module.exports = {
	a11yTest,
};
