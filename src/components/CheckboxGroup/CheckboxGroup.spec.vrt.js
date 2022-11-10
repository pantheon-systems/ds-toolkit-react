const { test, expect } = require('@playwright/test');
const { gotoFrame, focusViaTab } = require('../../libs/testing/vrt');

const storyID = 'components-inputs-checkbox-group--checkbox-group';

// enable single file parallelism
test.describe.configure({ mode: 'parallel' });

// Page screenshot clipping/cropping dimensions
const clipOptions = { x: 0, y: 0, width: 350, height: 500 };

test.describe('Components/Inputs/Checkbox Group', () => {
	test('Default', async ({ page }) => {
		await gotoFrame(page, storyID);

		expect(await page.screenshot({ clip: clipOptions })).toMatchSnapshot(
			'checkbox-group__default.png',
		);
	});

	test('Select option: via mouse', async ({ page }) => {
		await gotoFrame(page, storyID);

		const optionSecond = page.locator('#pds-sample-checkbox-group-option-1');

		await optionSecond.click();

		expect(await page.screenshot({ clip: clipOptions })).toMatchSnapshot(
			'checkbox-group__selection-via-mouse.png',
		);
	});

	test('Select option: via keyboard', async ({ page, browserName }) => {
		await gotoFrame(page, storyID);

		await focusViaTab(page, browserName);

		await focusViaTab(page, browserName);

		await page.keyboard.press('Space');

		expect(await page.screenshot({ clip: clipOptions })).toMatchSnapshot(
			'checkbox-group__selection-via-keyboard.png',
		);
	});
});
