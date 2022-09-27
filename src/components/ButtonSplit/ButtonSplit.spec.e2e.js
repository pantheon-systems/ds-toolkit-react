const { test, expect } = require('@playwright/test');
const { gotoFrame, focusViaTab } = require('../../libs/testing/vrt');

const storyID = 'components-button-split--button-split';

const {
	dialogMsgBase,
	sampleActionItems,
} = require('./button-split-sample-data');

// enable single file parallelism
test.describe.configure({ mode: 'parallel' });

test.describe('Components/Button Split', () => {
	test('Primary action activated (via mouse)', async ({
		page,
		browserName,
	}) => {
		await gotoFrame(page, storyID);

		const primaryAction = page.locator('.pds-button-split__primary-action');

		// retrieve the intended action item's label
		const targetItemLabel = sampleActionItems[0].label;

		// setup handler for the browser dialog that will occur on activation
		await page.on('dialog', async (dialog) => {
			expect(dialog.message()).toBe(`${dialogMsgBase}${targetItemLabel}`);
			dialog.accept();
		});

		await primaryAction.click();
	});

	test('Menu action activated (via mouse)', async ({ page, browserName }) => {
		await gotoFrame(page, storyID);

		const menuButton = page.locator('.pds-button-split__menu-button');

		await menuButton.click();

		// get the intended menu item
		const itemSecond = page.locator(
			'.pds-button-split__menu-button [role="menu"] [role="menuitem"] >> nth=1',
		);

		// retrieve the intended action item's label
		const targetItemLabel = sampleActionItems[1].label;

		// setup handler for the browser dialog that will occur on activation
		await page.on('dialog', async (dialog) => {
			expect(dialog.message()).toBe(`${dialogMsgBase}${targetItemLabel}`);
			dialog.accept();
		});

		await itemSecond.click();
	});
});
