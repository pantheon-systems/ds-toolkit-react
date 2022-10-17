const { test, expect } = require('@playwright/test');
const { gotoFrame, focusViaTab } = require('../../libs/testing/vrt');

const storyID = 'components-stepper--stepper';

const { dialogMsgBase, threeSteps } = require('./stepper-sample-data');

// enable single file parallelism
test.describe.configure({ mode: 'parallel' });

test.describe('Components/Stepper', () => {
	test('Activate button (via mouse)', async ({ page, browserName }) => {
		await gotoFrame(page, storyID);

		const button = page.locator('button.pds-stepper__step-content');

		// Retrieve the intended step's label
		const targetItemLabel = threeSteps[0].label;

		// Set up handler for the browser dialog that will occur on activation
		await page.on('dialog', async (dialog) => {
			expect(dialog.message()).toBe(`${dialogMsgBase}${targetItemLabel}`);
			dialog.accept();
		});

		await button.click();
	});
});
