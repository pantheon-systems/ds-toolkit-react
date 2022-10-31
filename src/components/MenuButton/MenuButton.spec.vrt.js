const { test, expect } = require('@playwright/test');
const { gotoFrame, focusViaTab } = require('../../libs/testing/vrt');

const storyID = 'components-buttons-menu-button--menu-button';

const {
	dialogMsgBase,
	sampleMenuItems,
	sampleSimpleMenuItems,
} = require('./menu-button-sample-data');

const screenshotDelay = 250;

// enable single file parallelism
test.describe.configure({ mode: 'parallel' });

// Page screenshot clipping/cropping dimensions
const clipOptions = { x: 0, y: 0, width: 250, height: 400 };

test.describe('Components/Buttons/Menu Button', () => {
	test.describe('General', () => {
		test('Base', async ({ page }) => {
			await gotoFrame(page, storyID);

			expect(await page.screenshot({ clip: clipOptions })).toMatchSnapshot(
				'menu-button__general-base.png',
			);
		});

		test('State: hover', async ({ page }) => {
			await gotoFrame(page, storyID);

			const button = page.locator('.pds-menu-button');

			await button.hover();

			expect(await page.screenshot({ clip: clipOptions })).toMatchSnapshot(
				'menu-button__general-hover.png',
			);
		});

		test('State: active', async ({ page }) => {
			await gotoFrame(page, storyID);

			const button = page.locator('.pds-menu-button');

			await button.hover();
			await page.mouse.down();

			expect(await page.screenshot({ clip: clipOptions })).toMatchSnapshot(
				'menu-button__general-active.png',
			);
		});

		test('State: focused', async ({ page, browserName }) => {
			await gotoFrame(page, storyID);

			await focusViaTab(page, browserName);

			expect(await page.screenshot({ clip: clipOptions })).toMatchSnapshot(
				'menu-button__general-focused.png',
			);
		});
	});

	test.describe('Complex data', () => {
		test('Menu open (via mouse)', async ({ page }) => {
			await gotoFrame(page, storyID);

			const button = page.locator('.pds-menu-button');
			await button.click();

			page.waitForTimeout(screenshotDelay);

			expect(await page.screenshot({ clip: clipOptions })).toMatchSnapshot(
				'menu-button__complex-data-mouse_menu-open.png',
			);
		});

		test('Menu open (via keyboard: space)', async ({ page, browserName }) => {
			await gotoFrame(page, storyID);

			await focusViaTab(page, browserName);

			await page.keyboard.press(' ');

			page.waitForTimeout(screenshotDelay);

			expect(await page.screenshot({ clip: clipOptions })).toMatchSnapshot(
				'menu-button__complex-a11y-keyboard-space_menu-open.png',
			);
		});

		test('Menu open (via keyboard: enter)', async ({ page, browserName }) => {
			await gotoFrame(page, storyID);

			await focusViaTab(page, browserName);

			await page.keyboard.press('Enter');

			page.waitForTimeout(screenshotDelay);

			expect(await page.screenshot({ clip: clipOptions })).toMatchSnapshot(
				'menu-button__complex-a11y-keyboard-enter_menu-open.png',
			);
		});

		test('Menu open (via keyboard: arrow down)', async ({
			page,
			browserName,
		}) => {
			await gotoFrame(page, storyID);

			await focusViaTab(page, browserName);

			await page.keyboard.press('ArrowDown');

			page.waitForTimeout(screenshotDelay);

			expect(await page.screenshot({ clip: clipOptions })).toMatchSnapshot(
				'menu-button__complex-a11y-keyboard-arrow-down_menu-open.png',
			);
		});

		test('Menu open (via keyboard: arrow up)', async ({
			page,
			browserName,
		}) => {
			await gotoFrame(page, storyID);

			await focusViaTab(page, browserName);

			await page.keyboard.press('ArrowUp');

			page.waitForTimeout(screenshotDelay);

			expect(await page.screenshot({ clip: clipOptions })).toMatchSnapshot(
				'menu-button__complex-a11y-keyboard-arrow-up_menu-open.png',
			);
		});

		test('Item focused (via keyboard: arrow down)', async ({
			page,
			browserName,
		}) => {
			await gotoFrame(page, storyID);

			await focusViaTab(page, browserName);

			await page.keyboard.press('Enter');
			await page.waitForTimeout(100);
			await page.keyboard.press('ArrowDown');
			await page.waitForTimeout(100);
			await page.keyboard.press('ArrowDown');

			expect(await page.screenshot({ clip: clipOptions })).toMatchSnapshot(
				'menu-button__complex-a11y-keyboard-arrow-down_item-focused.png',
			);
		});

		test('Item focused (via keyboard: arrow up)', async ({
			page,
			browserName,
		}) => {
			await gotoFrame(page, storyID);

			await focusViaTab(page, browserName);

			await page.keyboard.press('Enter');
			await page.waitForTimeout(100);
			await page.keyboard.press('ArrowUp');
			await page.waitForTimeout(100);
			await page.keyboard.press('ArrowUp');

			expect(await page.screenshot({ clip: clipOptions })).toMatchSnapshot(
				'menu-button__complex-a11y-keyboard-arrow-up_item-focused.png',
			);
		});
	});

	test.describe('Simple data', () => {
		test('Menu open (via mouse)', async ({ page }) => {
			await gotoFrame(page, storyID, 'menuItems:sampleSimpleMenuItems');

			const button = page.locator('.pds-menu-button');
			await button.click();

			expect(await page.screenshot({ clip: clipOptions })).toMatchSnapshot(
				'menu-button__simple-data-mouse_menu-open.png',
			);
		});

		test('Menu open (via keyboard: space)', async ({ page, browserName }) => {
			await gotoFrame(page, storyID, 'menuItems:sampleSimpleMenuItems');

			await focusViaTab(page, browserName);

			await page.keyboard.press(' ');

			expect(await page.screenshot({ clip: clipOptions })).toMatchSnapshot(
				'menu-button__simple-a11y-keyboard-space_menu-open.png',
			);
		});

		test('Menu open (via keyboard: enter)', async ({ page, browserName }) => {
			await gotoFrame(page, storyID, 'menuItems:sampleSimpleMenuItems');

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
			await gotoFrame(page, storyID, 'menuItems:sampleSimpleMenuItems');

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
			await gotoFrame(page, storyID, 'menuItems:sampleSimpleMenuItems');

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
			await gotoFrame(page, storyID, 'menuItems:sampleSimpleMenuItems');

			await focusViaTab(page, browserName);

			await page.keyboard.press('Enter');
			await page.waitForTimeout(100);
			await page.keyboard.press('ArrowDown');
			await page.waitForTimeout(100);
			await page.keyboard.press('ArrowDown');

			expect(await page.screenshot({ clip: clipOptions })).toMatchSnapshot(
				'menu-button__simple-a11y-keyboard-arrow-down_item-focused.png',
			);
		});

		test('Item focused (via keyboard: arrow up)', async ({
			page,
			browserName,
		}) => {
			await gotoFrame(page, storyID, 'menuItems:sampleSimpleMenuItems');

			await focusViaTab(page, browserName);

			await page.keyboard.press('Enter');
			await page.waitForTimeout(100);
			await page.keyboard.press('ArrowUp');
			await page.waitForTimeout(100);
			await page.keyboard.press('ArrowUp');

			expect(await page.screenshot({ clip: clipOptions })).toMatchSnapshot(
				'menu-button__simple-a11y-keyboard-arrow-up_item-focused.png',
			);
		});
	});
});
