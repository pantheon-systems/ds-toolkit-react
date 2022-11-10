const { test, expect } = require('@playwright/test');
const { gotoFrame, focusViaTab } = require('../../../src/libs/testing/vrt');
const { a11yTest } = require('../../../src/libs/testing/a11y');

const storyID = 'components-inputs-checkbox--checkbox';

// enable single file parallelism
test.describe.configure({ mode: 'parallel' });

test.describe('Components/Inputs/Checkbox', () => {
	test('Default', async ({ page }) => {
		await gotoFrame(page, storyID);

		const a11yNumViolations = await a11yTest(page, 'checkbox__default');

		expect(
			a11yNumViolations,
			`${a11yNumViolations} accessibility issues found.`,
		).toBe(0);
	});

	test('Checked', async ({ page }) => {
		await gotoFrame(page, storyID, 'checked:true');

		const a11yNumViolations = await a11yTest(page, 'checkbox__checked');

		expect(
			a11yNumViolations,
			`${a11yNumViolations} accessibility issues found.`,
		).toBe(0);
	});

	test('Disabled', async ({ page }) => {
		await gotoFrame(page, storyID, 'disabled:true');

		const a11yNumViolations = await a11yTest(page, 'checkbox__disabled');

		expect(
			a11yNumViolations,
			`${a11yNumViolations} accessibility issues found.`,
		).toBe(0);
	});

	test('State: focused', async ({ page, browserName }) => {
		await gotoFrame(page, storyID);

		await focusViaTab(page, browserName);

		const a11yNumViolations = await a11yTest(page, 'checkbox__focused');

		expect(
			a11yNumViolations,
			`${a11yNumViolations} accessibility issues found.`,
		).toBe(0);
	});
});
