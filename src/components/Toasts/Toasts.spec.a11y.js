const { test, expect } = require('@playwright/test');
const { gotoFrame, focusViaTab } = require('../../../src/libs/testing/vrt');
const { a11yTest } = require('../../../src/libs/testing/a11y');

const storyID = 'components-toasts--toasts';

// enable single file parallelism
test.describe.configure({ mode: 'parallel' });

test.describe('Components/Toasts', () => {
	test('Default', async ({ page }) => {
		await gotoFrame(page, storyID);

		// required to allow animations to complete
		await page.waitForTimeout(2000);

		const a11yNumViolations = await a11yTest(page, 'toasts__default');

		expect(
			a11yNumViolations,
			`${a11yNumViolations} accessibility issues found.`,
		).toBe(0);
	});
});
