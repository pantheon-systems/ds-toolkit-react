const { test, expect } = require('@playwright/test');
const { gotoFrame, focusViaTab } = require('../../../src/libs/testing/vrt');
const { a11yTest } = require('../../../src/libs/testing/a11y');

const storyID = 'components-inputs-checkbox-group--checkbox-group';

// enable single file parallelism
test.describe.configure({ mode: 'parallel' });

test.describe('Components/Inputs/Checkbox Group', () => {
	test('Default', async ({ page }) => {
		await gotoFrame(page, storyID);

		const a11yNumViolations = await a11yTest(page, 'checkbox-group__default');

		expect(
			a11yNumViolations,
			`${a11yNumViolations} accessibility issues found.`,
		).toBe(0);
	});

	test('Focused: second option', async ({ page, browserName }) => {
		await gotoFrame(page, storyID);

		await focusViaTab(page, browserName);

		await focusViaTab(page, browserName);

		const a11yNumViolations = await a11yTest(
			page,
			'checkbox-group__focused-option',
		);

		expect(
			a11yNumViolations,
			`${a11yNumViolations} accessibility issues found.`,
		).toBe(0);
	});
});
