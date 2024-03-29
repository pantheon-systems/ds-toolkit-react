const { test, expect } = require('@playwright/test');
const { gotoFrame, focusViaTab } = require('../../libs/testing/vrt');

const storyID = 'components-buttons--button';

// enable single file parallelism
test.describe.configure({ mode: 'parallel' });

// Page screenshot clipping/cropping dimensions
const clipOptions = { x: 0, y: 0, width: 150, height: 75 };

test.describe('Components/Buttons/Button', () => {
	test.describe('Default/Secondary', () => {
		test('Base', async ({ page }) => {
			await gotoFrame(page, storyID);

			expect(await page.screenshot({ clip: clipOptions })).toMatchSnapshot(
				'button__default.png',
			);
		});

		test('Disabled', async ({ page }) => {
			await gotoFrame(page, storyID, 'disabled:true');

			expect(await page.screenshot({ clip: clipOptions })).toMatchSnapshot(
				'button__default-disabled.png',
			);
		});

		test('State: hover', async ({ page }) => {
			await gotoFrame(page, storyID);

			const button = page.locator('.pds-button');

			await button.hover();

			expect(await page.screenshot({ clip: clipOptions })).toMatchSnapshot(
				'button__default-hover.png',
			);
		});

		test('State: active', async ({ page }) => {
			await gotoFrame(page, storyID);

			const button = page.locator('.pds-button');

			await button.hover();
			await page.mouse.down();

			expect(await page.screenshot({ clip: clipOptions })).toMatchSnapshot(
				'button__default-active.png',
			);
		});

		test('State: focused', async ({ page, browserName }) => {
			await gotoFrame(page, storyID);

			await focusViaTab(page, browserName);

			expect(await page.screenshot({ clip: clipOptions })).toMatchSnapshot(
				'button__default-focused.png',
			);
		});
	});

	test.describe('Primary', () => {
		test('Base', async ({ page }) => {
			await gotoFrame(page, storyID, 'variant:primary');

			expect(await page.screenshot({ clip: clipOptions })).toMatchSnapshot(
				'button__primary.png',
			);
		});

		test('Disabled', async ({ page }) => {
			await gotoFrame(page, storyID, 'variant:primary;disabled:true');

			expect(await page.screenshot({ clip: clipOptions })).toMatchSnapshot(
				'button__primary-disabled.png',
			);
		});

		test('State: hover', async ({ page }) => {
			await gotoFrame(page, storyID, 'variant:primary');

			const button = page.locator('.pds-button');

			await button.hover();

			expect(await page.screenshot({ clip: clipOptions })).toMatchSnapshot(
				'button__primary-hover.png',
			);
		});

		test('State: active', async ({ page }) => {
			await gotoFrame(page, storyID, 'variant:primary');

			const button = page.locator('.pds-button');

			await button.hover();
			await page.mouse.down();

			expect(await page.screenshot({ clip: clipOptions })).toMatchSnapshot(
				'button__primary-active.png',
			);
		});

		test('State: focused', async ({ page, browserName }) => {
			await gotoFrame(page, storyID, 'variant:primary');

			await focusViaTab(page, browserName);

			expect(await page.screenshot({ clip: clipOptions })).toMatchSnapshot(
				'button__primary-focused.png',
			);
		});
	});

	test.describe('Subtle', () => {
		test('Base', async ({ page }) => {
			await gotoFrame(page, storyID, 'variant:subtle');

			expect(await page.screenshot({ clip: clipOptions })).toMatchSnapshot(
				'button__subtle.png',
			);
		});

		test('Disabled', async ({ page }) => {
			await gotoFrame(page, storyID, 'variant:subtle;disabled:true');

			expect(await page.screenshot({ clip: clipOptions })).toMatchSnapshot(
				'button__subtle-disabled.png',
			);
		});

		test('State: hover', async ({ page }) => {
			await gotoFrame(page, storyID, 'variant:subtle');

			const button = page.locator('.pds-button');

			await button.hover();

			expect(await page.screenshot({ clip: clipOptions })).toMatchSnapshot(
				'button__subtle-hover.png',
			);
		});

		test('State: active', async ({ page }) => {
			await gotoFrame(page, storyID, 'variant:subtle');

			const button = page.locator('.pds-button');

			await button.hover();
			await page.mouse.down();

			expect(await page.screenshot({ clip: clipOptions })).toMatchSnapshot(
				'button__subtle-active.png',
			);
		});

		test('State: focused', async ({ page, browserName }) => {
			await gotoFrame(page, storyID, 'variant:subtle');

			await focusViaTab(page, browserName);

			expect(await page.screenshot({ clip: clipOptions })).toMatchSnapshot(
				'button__subtle-focused.png',
			);
		});
	});

	test.describe('Critical', () => {
		test('Base', async ({ page }) => {
			await gotoFrame(page, storyID, 'variant:critical');

			expect(await page.screenshot({ clip: clipOptions })).toMatchSnapshot(
				'button__critical.png',
			);
		});

		test('Disabled', async ({ page }) => {
			await gotoFrame(page, storyID, 'variant:critical;disabled:true');

			expect(await page.screenshot({ clip: clipOptions })).toMatchSnapshot(
				'button__critical-disabled.png',
			);
		});

		test('State: hover', async ({ page }) => {
			await gotoFrame(page, storyID, 'variant:critical');

			const button = page.locator('.pds-button');

			await button.hover();

			expect(await page.screenshot({ clip: clipOptions })).toMatchSnapshot(
				'button__critical-hover.png',
			);
		});

		test('State: active', async ({ page }) => {
			await gotoFrame(page, storyID, 'variant:critical');

			const button = page.locator('.pds-button');

			await button.hover();
			await page.mouse.down();

			expect(await page.screenshot({ clip: clipOptions })).toMatchSnapshot(
				'button__critical-active.png',
			);
		});

		test('State: focused', async ({ page, browserName }) => {
			await gotoFrame(page, storyID, 'variant:critical');

			await focusViaTab(page, browserName);

			expect(await page.screenshot({ clip: clipOptions })).toMatchSnapshot(
				'button__critical-focused.png',
			);
		});
	});
});
