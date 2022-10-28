const { test, expect } = require('@playwright/test');
const { gotoFrame, focusViaTab } = require('../../libs/testing/vrt');

const storyID = 'components-buttons-menu-button--menu-button';

const {
	dialogMsgBase,
	sampleMenuItems,
	sampleSimpleMenuItems,
} = require('./menu-button-sample-data');

// enable single file parallelism
test.describe.configure({ mode: 'parallel' });

test.describe('Components/Buttons/Menu Button', () => {
	test.describe('Complex data', () => {
		test('Item activated (via keyboard)', async ({ page, browserName }) => {
			await gotoFrame(page, storyID);

			await focusViaTab(page, browserName);

			await page.keyboard.press('Enter');
			await page.keyboard.press('ArrowDown');
			await page.keyboard.press('ArrowDown');

			// retrieve the intended menu item's label
			const targetItemLabel = sampleMenuItems[4].label;

			// setup handler for the browser dialog that will occur on activation
			await page.on('dialog', async (dialog) => {
				expect(dialog.message()).toBe(`${dialogMsgBase}${targetItemLabel}`);
				dialog.accept();
			});

			await page.keyboard.press('Enter');
		});

		test('Item activated (via mouse)', async ({ page, browserName }) => {
			await gotoFrame(page, storyID);

			const button = page.locator('.pds-menu-button');

			await button.click();

			// get the intended menu item
			const itemFourth = page.locator(
				'.pds-menu-button [role="menu"] [role="menuitem"] >> nth=3',
			);

			// retrieve the intended menu item's label
			const targetItemLabel = sampleMenuItems[5].label;

			// setup handler for the browser dialog that will occur on activation
			await page.on('dialog', async (dialog) => {
				expect(dialog.message()).toBe(`${dialogMsgBase}${targetItemLabel}`);
				dialog.accept();
			});

			await itemFourth.click();
		});
	});

	test.describe('Simple data', () => {
		test('Item activated (via keyboard)', async ({ page, browserName }) => {
			await gotoFrame(page, storyID, 'menuItems:sampleSimpleMenuItems');

			await focusViaTab(page, browserName);

			await page.keyboard.press('Enter');
			await page.keyboard.press('ArrowUp');
			await page.keyboard.press('ArrowUp');

			// retrieve the intended menu item's label
			const targetItemLabel = sampleSimpleMenuItems[5].label;

			// setup handler for the browser dialog that will occur on activation
			await page.on('dialog', async (dialog) => {
				expect(dialog.message()).toBe(`${dialogMsgBase}${targetItemLabel}`);
				dialog.accept();
			});

			await page.keyboard.press('Enter');
		});

		test('Item activated (via mouse)', async ({ page, browserName }) => {
			await gotoFrame(page, storyID, 'menuItems:sampleSimpleMenuItems');

			const button = page.locator('.pds-menu-button');

			await button.click();

			// get the intended menu item
			const itemFourth = page.locator(
				'.pds-menu-button [role="menu"] [role="menuitem"] >> nth=3',
			);

			// retrieve the intended menu item's label
			const targetItemLabel = sampleSimpleMenuItems[3].label;

			// setup handler for the browser dialog that will occur on activation
			await page.on('dialog', async (dialog) => {
				expect(dialog.message()).toBe(`${dialogMsgBase}${targetItemLabel}`);
				dialog.accept();
			});

			await itemFourth.click();
		});
	});
});
