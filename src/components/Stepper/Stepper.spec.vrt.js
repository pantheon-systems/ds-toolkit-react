const { test, expect } = require('@playwright/test');
const { gotoFrame, focusViaTab } = require('../../libs/testing/vrt');

const storyID = 'components-stepper--stepper';

// enable single file parallelism
test.describe.configure({ mode: 'parallel' });

// Page screenshot clipping/cropping dimensions
const clipOptions = { x: 0, y: 0, width: 1200, height: 300 };

test.describe('Components/Stepper', () => {
	test.describe('General', () => {
		test('Base', async ({ page }) => {
			await gotoFrame(page, storyID);

			expect(await page.screenshot({ clip: clipOptions })).toMatchSnapshot(
				'stepper__general-base.png',
			);
		});

		test('State: hover', async ({ page }) => {
			await gotoFrame(page, storyID);

			const button = page.locator('button.pds-stepper__step-content');

			await button.hover();

			expect(await page.screenshot({ clip: clipOptions })).toMatchSnapshot(
				'stepper__general-hover.png',
			);
		});

		test('State: focused', async ({ page, browserName }) => {
			await gotoFrame(page, storyID);

			await focusViaTab(page, browserName);

			expect(await page.screenshot({ clip: clipOptions })).toMatchSnapshot(
				'stepper__general-focused.png',
			);
		});

		test('State: active', async ({ page }) => {
			await gotoFrame(page, storyID);

			const button = page.locator('button.pds-stepper__step-content');
			await button.hover();
			await page.mouse.down();

			expect(await page.screenshot({ clip: clipOptions })).toMatchSnapshot(
				'stepper__general-active.png',
			);
		});
	});
	test.describe('With Error', () => {
		test('Base', async ({ page }) => {
			await gotoFrame(page, storyID, 'steps:threeStepsWithError');

			expect(await page.screenshot({ clip: clipOptions })).toMatchSnapshot(
				'stepper__with-error-base.png',
			);
		});
	});
});
