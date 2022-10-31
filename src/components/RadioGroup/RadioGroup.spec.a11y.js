const { test, expect } = require('@playwright/test');
const { gotoFrame, focusViaTab } = require('../../../src/libs/testing/vrt');
const { a11yTest } = require('../../../src/libs/testing/a11y');

const storyID = 'components-inputs-radio-group--radio-group';

// enable single file parallelism
test.describe.configure({ mode: 'parallel' });

test.describe('Components/Inputs/Radio Group', () => {
	test('Default', async ({ page }) => {
		await gotoFrame(page, storyID);

		const a11yNumViolations = await a11yTest(page, 'radio-group__default');

		expect(
			a11yNumViolations,
			`${a11yNumViolations} accessibility issues found.`,
		).toBe(0);
	});

	test('Selected', async ({ page }) => {
		await gotoFrame(page, storyID);

		// get the intended option
		const optionSecond = page.locator(
			'.pds-radio-group__options .pds-radio-group__option >> nth=1',
		);

		await optionSecond.click();

		// wait for animation to complete
		await page.waitForTimeout(250);

		const a11yNumViolations = await a11yTest(page, 'radio-group__selected');

		expect(
			a11yNumViolations,
			`${a11yNumViolations} accessibility issues found.`,
		).toBe(0);
	});
});
