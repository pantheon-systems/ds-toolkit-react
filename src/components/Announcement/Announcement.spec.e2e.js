const { test, expect } = require('@playwright/test');
const { gotoFrame, focusViaTab } = require('../../libs/testing/vrt');

const storyID = 'components-announcement--announcement-dismissible';

// enable single file parallelism
test.describe.configure({ mode: 'parallel' });

test.describe('Components/Announcement', () => {
	test('Dismissible: click button (mouse)', async ({ page, browserName }) => {
		await gotoFrame(page, storyID);

		const button = page.locator('button.pds-announcement__dismiss');

		// Set up handler for the browser dialog that will occur on activation
		await page.on('dialog', async (dialog) => {
			expect(dialog.message()).toBe(`Dismiss button clicked...`);
			dialog.accept();
		});

		await button.click();
	});
});
