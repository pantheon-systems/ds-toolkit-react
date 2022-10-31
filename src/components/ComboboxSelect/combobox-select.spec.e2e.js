const { test, expect } = require('@playwright/test');
const { gotoFrame, focusViaTab } = require('../../libs/testing/vrt');

const {
	sampleSelectOptions,
	sampleSelectOptionsScrolling,
} = require('./combobox-select-sample-data');

const storyID = 'components-inputs-combobox-select--combobox-select';

// enable single file parallelism
test.describe.configure({ mode: 'parallel' });

test.describe('Components/Inputs/Combobox select', () => {
	test.describe('Non-scrolling listbox', () => {
		test('Option selected (via keyboard)', async ({ page, browserName }) => {
			await gotoFrame(page, storyID);

			await focusViaTab(page, browserName);

			await page.keyboard.press('Enter');
			await page.keyboard.press('ArrowDown');
			await page.keyboard.press('ArrowDown');

			// retrieve the intended option's label
			const targetOptionLabel = sampleSelectOptions[2].label;

			await page.keyboard.press('Enter');

			const combobox = page.locator('.pds-combobox-select [role="combobox"]');

			expect(await combobox.textContent()).toBe(targetOptionLabel);
		});

		test('Option selected (via mouse)', async ({ page, browserName }) => {
			await gotoFrame(page, storyID);

			const combobox = page.locator('.pds-combobox-select [role="combobox"]');
			await combobox.click();

			// get the intended menu item
			const optionThird = page.locator(
				'.pds-combobox-select [role="listbox"] [role="option"] >> nth=2',
			);

			// retrieve the intended option's label
			const targetOptionLabel = sampleSelectOptions[2].label;

			await optionThird.click();

			expect(await combobox.textContent()).toBe(targetOptionLabel);
		});
	});

	test.describe('Scrolling listbox', () => {
		test('Option selected (via keyboard)', async ({ page, browserName }) => {
			await gotoFrame(
				page,
				storyID,
				'selectOptions:sampleSelectOptionsScrolling',
			);

			await focusViaTab(page, browserName);

			await page.keyboard.press('Enter');

			// arrow down 12 times
			for (let x = 0; x < 12; x++) {
				await page.keyboard.press('ArrowDown');
			}

			// retrieve the intended option's label
			const targetOptionLabel = sampleSelectOptionsScrolling[12].label;

			await page.keyboard.press('Enter');

			const combobox = page.locator('.pds-combobox-select [role="combobox"]');

			expect(await combobox.textContent()).toBe(targetOptionLabel);
		});

		test('Option selected (via mouse)', async ({ page, browserName }) => {
			await gotoFrame(
				page,
				storyID,
				'selectOptions:sampleSelectOptionsScrolling',
			);

			const combobox = page.locator('.pds-combobox-select [role="combobox"]');
			await combobox.click();

			// get the intended menu item
			const optionThird = page.locator(
				'.pds-combobox-select [role="listbox"] [role="option"] >> nth=12',
			);

			// retrieve the intended option's label
			const targetOptionLabel = sampleSelectOptionsScrolling[12].label;

			await optionThird.click();

			expect(await combobox.textContent()).toBe(targetOptionLabel);
		});
	});
});
