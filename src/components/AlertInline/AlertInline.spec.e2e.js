/*
 * !!! DELETE THIS FILE
 * -> if no specific end-to-end/non-VRT tests are needed for the component
 */

const { test, expect } = require('@playwright/test');
const { gotoFrame, focusViaTab } = require('../../libs/testing/vrt');

const storyID = 'components-alerts-inline--alert-inline-dismissible';

// enable single file parallelism
test.describe.configure({ mode: 'parallel' });

test.describe('Components/Alerts/Inline', () => {
	test('Dismissible: click button (mouse)', async ({ page, browserName }) => {
		await gotoFrame(page, storyID);

		const button = page.locator('button.pds-alert-inline__dismiss');

		// Set up handler for the browser dialog that will occur on activation
		await page.on('dialog', async (dialog) => {
			expect(dialog.message()).toBe(`Dismiss button clicked...`);
			dialog.accept();
		});

		await button.click();
	});
});
