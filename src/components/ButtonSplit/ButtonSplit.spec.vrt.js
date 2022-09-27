const { test, expect } = require('@playwright/test');
const { gotoFrame, focusViaTab } = require('../../libs/testing/vrt');

const storyID = 'components-button-split--button-split';

// enable single file parallelism
test.describe.configure({ mode: 'parallel' });

// Page screenshot clipping/cropping dimensions
const clipOptions = { x: 0, y: 0, width: 175, height: 100 };
const clipOptionsLarge = { x: 0, y: 0, width: 250, height: 400 };

test.describe('Components/Button Split', () => {
	test('Base', async ({ page }) => {
		await gotoFrame(page, storyID);

		expect(await page.screenshot({ clip: clipOptions })).toMatchSnapshot(
			'button-split__base.png',
		);
	});

	test('State: hover over primary action', async ({ page }) => {
		await gotoFrame(page, storyID);

		const primaryAction = page.locator('.pds-button-split__primary-action');

		await primaryAction.hover();

		expect(await page.screenshot({ clip: clipOptions })).toMatchSnapshot(
			'button-split__primary-action-hover.png',
		);
	});

	test('State: hover over menu button', async ({ page }) => {
		await gotoFrame(page, storyID);

		const menuButton = page.locator('.pds-button-split__menu-button');

		await menuButton.hover();

		expect(await page.screenshot({ clip: clipOptions })).toMatchSnapshot(
			'button-split__menu-button-hover.png',
		);
	});

	test('State: active primary action', async ({ page }) => {
		await gotoFrame(page, storyID);

		const primaryAction = page.locator('.pds-button-split__primary-action');

		await primaryAction.hover();
		await page.mouse.down();

		expect(await page.screenshot({ clip: clipOptions })).toMatchSnapshot(
			'button-split__primary-action-active.png',
		);
	});

	test('State: active menu button', async ({ page }) => {
		await gotoFrame(page, storyID);

		const menuButton = page.locator('.pds-button-split__menu-button');

		await menuButton.hover();
		await page.mouse.down();

		expect(await page.screenshot({ clip: clipOptions })).toMatchSnapshot(
			'button-split__menu-button-active.png',
		);
	});

	test('State: focused on primary action', async ({ page, browserName }) => {
		await gotoFrame(page, storyID);

		await focusViaTab(page, browserName);

		expect(await page.screenshot({ clip: clipOptions })).toMatchSnapshot(
			'button-split__primary-action-focused.png',
		);
	});

	test('State: focused on menu button', async ({ page, browserName }) => {
		await gotoFrame(page, storyID);

		await focusViaTab(page, browserName);
		await focusViaTab(page, browserName);

		expect(await page.screenshot({ clip: clipOptions })).toMatchSnapshot(
			'button-split__menu-button-focused.png',
		);
	});

	test('Menu open (via mouse)', async ({ page }) => {
		await gotoFrame(page, storyID);

		const menuButton = page.locator('.pds-button-split__menu-button');
		await menuButton.click();

		expect(await page.screenshot({ clip: clipOptionsLarge })).toMatchSnapshot(
			'button-split__mouse_menu-open.png',
		);
	});
});
