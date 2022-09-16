const { test, expect } = require('@playwright/test');
const { gotoFrame, focusViaTab } = require('../../libs/testing/vrt');

const {
	dialogMsgBase,
	sampleMenuItems,
	sampleSimpleMenuItems,
} = require('./menu-button-sample-data');

// enable single file parallelism
test.describe.configure({ mode: 'parallel' });

// Page screenshot clipping/cropping dimensions
const clipOptions = { x: 0, y: 0, width: 250, height: 400 };

test.describe('Components/Menu Button', () => {
	test.describe('General', () => {
		test('Base', async ({ page }) => {
			await gotoFrame(page, 'components-menu-button--menu-button');

			const button = page.locator('.pds-menu-button');

			expect(await page.screenshot({ clip: clipOptions })).toMatchSnapshot(
				'menu-button__general-base.png',
			);
		});

		test('State: hover', async ({ page }) => {
			await gotoFrame(page, 'components-menu-button--menu-button');

			const button = page.locator('.pds-menu-button');

			await button.hover();

			expect(await page.screenshot({ clip: clipOptions })).toMatchSnapshot(
				'menu-button__general-hover.png',
			);
		});

		test('State: active', async ({ page }) => {
			await gotoFrame(page, 'components-menu-button--menu-button');

			const button = page.locator('.pds-menu-button');

			await button.hover();
			await page.mouse.down();

			expect(await page.screenshot({ clip: clipOptions })).toMatchSnapshot(
				'menu-button__general-active.png',
			);
		});

		test('State: focused', async ({ page, browserName }) => {
			await gotoFrame(page, 'components-menu-button--menu-button');

			const button = page.locator('.pds-menu-button');

			await focusViaTab(page, browserName);

			expect(await page.screenshot({ clip: clipOptions })).toMatchSnapshot(
				'menu-button__general-focused.png',
			);
		});
	});

	test.describe('Complex data', () => {
		test('Menu open (via mouse)', async ({ page }) => {
			await gotoFrame(page, 'components-menu-button--menu-button');

			const button = page.locator('.pds-menu-button');
			await button.click();

			expect(await page.screenshot({ clip: clipOptions })).toMatchSnapshot(
				'menu-button__complex-data-mouse_menu-open.png',
			);
		});

		test('Menu open (via keyboard: space)', async ({ page, browserName }) => {
			await gotoFrame(page, 'components-menu-button--menu-button');

			const button = page.locator('.pds-menu-button');

			await focusViaTab(page, browserName);

			await page.keyboard.press(' ');

			expect(await page.screenshot({ clip: clipOptions })).toMatchSnapshot(
				'menu-button__complex-a11y-keyboard-space_menu-open.png',
			);
		});

		test('Menu open (via keyboard: enter)', async ({ page, browserName }) => {
			await gotoFrame(page, 'components-menu-button--menu-button');

			const button = page.locator('.pds-menu-button');

			await focusViaTab(page, browserName);

			await page.keyboard.press('Enter');

			expect(await page.screenshot({ clip: clipOptions })).toMatchSnapshot(
				'menu-button__complex-a11y-keyboard-enter_menu-open.png',
			);
		});

		test('Menu open (via keyboard: arrow down)', async ({
			page,
			browserName,
		}) => {
			await gotoFrame(page, 'components-menu-button--menu-button');

			const button = page.locator('.pds-menu-button');

			await focusViaTab(page, browserName);

			await page.keyboard.press('ArrowDown');

			expect(await page.screenshot({ clip: clipOptions })).toMatchSnapshot(
				'menu-button__complex-a11y-keyboard-arrow-down_menu-open.png',
			);
		});

		test('Menu open (via keyboard: arrow up)', async ({
			page,
			browserName,
		}) => {
			await gotoFrame(page, 'components-menu-button--menu-button');

			const button = page.locator('.pds-menu-button');

			await focusViaTab(page, browserName);

			await page.keyboard.press('ArrowUp');

			expect(await page.screenshot({ clip: clipOptions })).toMatchSnapshot(
				'menu-button__complex-a11y-keyboard-arrow-up_menu-open.png',
			);
		});

		test('Item focused (via keyboard: arrow down)', async ({
			page,
			browserName,
		}) => {
			await gotoFrame(page, 'components-menu-button--menu-button');

			const button = page.locator('.pds-menu-button');

			await focusViaTab(page, browserName);

			await page.keyboard.press('Enter');
			await page.keyboard.press('ArrowDown');
			await page.keyboard.press('ArrowDown');

			expect(await page.screenshot({ clip: clipOptions })).toMatchSnapshot(
				'menu-button__complex-a11y-keyboard-arrow-down_item-focused.png',
			);
		});

		test('Item focused (via keyboard: arrow up)', async ({
			page,
			browserName,
		}) => {
			await gotoFrame(page, 'components-menu-button--menu-button');

			const button = page.locator('.pds-menu-button');

			await focusViaTab(page, browserName);

			await page.keyboard.press('Enter');
			await page.keyboard.press('ArrowUp');
			await page.keyboard.press('ArrowUp');

			expect(await page.screenshot({ clip: clipOptions })).toMatchSnapshot(
				'menu-button__complex-a11y-keyboard-arrow-up_item-focused.png',
			);
		});

		test('Item activated (via keyboard)', async ({ page, browserName }) => {
			await gotoFrame(page, 'components-menu-button--menu-button');

			const button = page.locator('.pds-menu-button');

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
			await gotoFrame(page, 'components-menu-button--menu-button');

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
		test('Menu open (via mouse)', async ({ page }) => {
			await gotoFrame(
				page,
				'components-menu-button--menu-button',
				'menuItems:sampleSimpleMenuItems',
			);

			const button = page.locator('.pds-menu-button');
			await button.click();

			expect(await page.screenshot({ clip: clipOptions })).toMatchSnapshot(
				'menu-button__simple-data-mouse_menu-open.png',
			);
		});

		test('Menu open (via keyboard: space)', async ({ page, browserName }) => {
			await gotoFrame(
				page,
				'components-menu-button--menu-button',
				'menuItems:sampleSimpleMenuItems',
			);

			const button = page.locator('.pds-menu-button');

			await focusViaTab(page, browserName);

			await page.keyboard.press(' ');

			expect(await page.screenshot({ clip: clipOptions })).toMatchSnapshot(
				'menu-button__simple-a11y-keyboard-space_menu-open.png',
			);
		});

		test('Menu open (via keyboard: enter)', async ({ page, browserName }) => {
			await gotoFrame(
				page,
				'components-menu-button--menu-button',
				'menuItems:sampleSimpleMenuItems',
			);

			const button = page.locator('.pds-menu-button');

			await focusViaTab(page, browserName);

			await page.keyboard.press('Enter');

			expect(await page.screenshot({ clip: clipOptions })).toMatchSnapshot(
				'menu-button__simple-a11y-keyboard-enter_menu-open.png',
			);
		});

		test('Menu open (via keyboard: arrow down)', async ({
			page,
			browserName,
		}) => {
			await gotoFrame(
				page,
				'components-menu-button--menu-button',
				'menuItems:sampleSimpleMenuItems',
			);

			const button = page.locator('.pds-menu-button');

			await focusViaTab(page, browserName);

			await page.keyboard.press('ArrowDown');

			expect(await page.screenshot({ clip: clipOptions })).toMatchSnapshot(
				'menu-button__simple-a11y-keyboard-arrow-down_menu-open.png',
			);
		});

		test('Menu open (via keyboard: arrow up)', async ({
			page,
			browserName,
		}) => {
			await gotoFrame(
				page,
				'components-menu-button--menu-button',
				'menuItems:sampleSimpleMenuItems',
			);

			const button = page.locator('.pds-menu-button');

			await focusViaTab(page, browserName);

			await page.keyboard.press('ArrowUp');

			expect(await page.screenshot({ clip: clipOptions })).toMatchSnapshot(
				'menu-button__simple-a11y-keyboard-arrow-up_menu-open.png',
			);
		});

		test('Item focused (via keyboard: arrow down)', async ({
			page,
			browserName,
		}) => {
			await gotoFrame(
				page,
				'components-menu-button--menu-button',
				'menuItems:sampleSimpleMenuItems',
			);

			const button = page.locator('.pds-menu-button');

			await focusViaTab(page, browserName);

			await page.keyboard.press('Enter');
			await page.keyboard.press('ArrowDown');
			await page.keyboard.press('ArrowDown');

			expect(await page.screenshot({ clip: clipOptions })).toMatchSnapshot(
				'menu-button__simple-a11y-keyboard-arrow-down_item-focused.png',
			);
		});

		test('Item focused (via keyboard: arrow up)', async ({
			page,
			browserName,
		}) => {
			await gotoFrame(
				page,
				'components-menu-button--menu-button',
				'menuItems:sampleSimpleMenuItems',
			);

			const button = page.locator('.pds-menu-button');

			await focusViaTab(page, browserName);

			await page.keyboard.press('Enter');
			await page.keyboard.press('ArrowUp');
			await page.keyboard.press('ArrowUp');

			expect(await page.screenshot({ clip: clipOptions })).toMatchSnapshot(
				'menu-button__simple-a11y-keyboard-arrow-up_item-focused.png',
			);
		});

		test('Item activated (via keyboard)', async ({ page, browserName }) => {
			await gotoFrame(
				page,
				'components-menu-button--menu-button',
				'menuItems:sampleSimpleMenuItems',
			);

			const button = page.locator('.pds-menu-button');

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
			await gotoFrame(
				page,
				'components-menu-button--menu-button',
				'menuItems:sampleSimpleMenuItems',
			);

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
