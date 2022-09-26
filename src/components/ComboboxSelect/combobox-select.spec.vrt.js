const { test, expect } = require('@playwright/test');
const { gotoFrame, focusViaTab } = require('../../libs/testing/vrt');

const {
	sampleSelectOptions,
	sampleSelectOptionsScrolling,
} = require('./combobox-select-sample-data');

const storyID = 'components-combobox-select--combobox-select';

// enable single file parallelism
test.describe.configure({ mode: 'parallel' });

// Page screenshot clipping/cropping dimensions
const clipOptions = { x: 0, y: 0, width: 350, height: 600 };
const clipOptionsSmall = { x: 0, y: 0, width: 250, height: 200 };

test.describe('Components/Combobox select', () => {
	test.describe('General', () => {
		test('Base', async ({ page }) => {
			await gotoFrame(page, storyID);

			expect(await page.screenshot({ clip: clipOptionsSmall })).toMatchSnapshot(
				'combobox-select__general-base.png',
			);
		});

		test('State: focused', async ({ page, browserName }) => {
			await gotoFrame(page, storyID);

			await focusViaTab(page, browserName);

			expect(await page.screenshot({ clip: clipOptionsSmall })).toMatchSnapshot(
				'combobox-select__general-focused.png',
			);
		});
	});

	test.describe('Non-scrolling listbox', () => {
		test('Listbox open (via mouse)', async ({ page }) => {
			await gotoFrame(page, storyID);

			const combobox = page.locator('.pds-combobox-select [role="combobox"]');
			await combobox.click();

			expect(await page.screenshot({ clip: clipOptions })).toMatchSnapshot(
				'combobox-select__non-scrolling-mouse_listbox-open.png',
			);
		});

		test('Lisbox open (via keyboard: space)', async ({ page, browserName }) => {
			await gotoFrame(page, storyID);

			await focusViaTab(page, browserName);

			await page.keyboard.press(' ');

			expect(await page.screenshot({ clip: clipOptions })).toMatchSnapshot(
				'combobox-select__non-scrolling-a11y-keyboard-space_listbox-open.png',
			);
		});

		test('Listbox open (via keyboard: enter)', async ({
			page,
			browserName,
		}) => {
			await gotoFrame(page, storyID);

			await focusViaTab(page, browserName);

			await page.keyboard.press('Enter');

			expect(await page.screenshot({ clip: clipOptions })).toMatchSnapshot(
				'combobox-select__non-scrolling-a11y-keyboard-enter_listbox-open.png',
			);
		});

		test('Listbox open (via keyboard: arrow down)', async ({
			page,
			browserName,
		}) => {
			await gotoFrame(page, storyID);

			await focusViaTab(page, browserName);

			await page.keyboard.press('ArrowDown');

			expect(await page.screenshot({ clip: clipOptions })).toMatchSnapshot(
				'combobox-select__non-scrolling-a11y-keyboard-arrow-down_listbox-open.png',
			);
		});

		test('Listbox open (via keyboard: arrow up)', async ({
			page,
			browserName,
		}) => {
			await gotoFrame(page, storyID);

			await focusViaTab(page, browserName);

			await page.keyboard.press('ArrowUp');

			expect(await page.screenshot({ clip: clipOptions })).toMatchSnapshot(
				'combobox-select__non-scrolling-a11y-keyboard-arrow-up_listbox-open.png',
			);
		});

		test('Option focused (via keyboard: arrow down)', async ({
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
				'combobox-select__non-scrolling-a11y-keyboard-arrow-down_option-focused.png',
			);
		});

		test('Option focused (via keyboard: arrow up)', async ({
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
				'combobox-select__non-scrolling-a11y-keyboard-arrow-up_option-focused.png',
			);
		});

		test('Render selected option (via keyboard)', async ({
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

			// retrieve the intended option's label
			const targetOptionLabel = sampleSelectOptions[2].label;

			await page.keyboard.press('Enter');

			const combobox = page.locator('.pds-combobox-select [role="combobox"]');

			// re-open the listbox
			await page.keyboard.press('Enter');

			expect(await page.screenshot({ clip: clipOptions })).toMatchSnapshot(
				'combobox-select__non-scrolling-a11y-keyboard_option-selected.png',
			);
		});

		test('Render selected option (via mouse)', async ({
			page,
			browserName,
		}) => {
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

			// re-open listbox
			await combobox.click();

			expect(await page.screenshot({ clip: clipOptions })).toMatchSnapshot(
				'combobox-select__non-scrolling_option-selected.png',
			);
		});
	});

	test.describe('Scrolling listbox', () => {
		test('Listbox open (via mouse)', async ({ page }) => {
			await gotoFrame(
				page,
				storyID,
				'selectOptions:sampleSelectOptionsScrolling',
			);

			const combobox = page.locator('.pds-combobox-select [role="combobox"]');
			await combobox.click();

			expect(await page.screenshot({ clip: clipOptions })).toMatchSnapshot(
				'combobox-select__scrolling-mouse_listbox-open.png',
			);
		});

		test('Lisbox open (via keyboard: space)', async ({ page, browserName }) => {
			await gotoFrame(
				page,
				storyID,
				'selectOptions:sampleSelectOptionsScrolling',
			);

			await focusViaTab(page, browserName);

			await page.keyboard.press(' ');

			expect(await page.screenshot({ clip: clipOptions })).toMatchSnapshot(
				'combobox-select__scrolling-a11y-keyboard-space_listbox-open.png',
			);
		});

		test('Listbox open (via keyboard: enter)', async ({
			page,
			browserName,
		}) => {
			await gotoFrame(
				page,
				storyID,
				'selectOptions:sampleSelectOptionsScrolling',
			);

			await focusViaTab(page, browserName);

			await page.keyboard.press('Enter');

			expect(await page.screenshot({ clip: clipOptions })).toMatchSnapshot(
				'combobox-select__scrolling-a11y-keyboard-enter_listbox-open.png',
			);
		});

		test('Listbox open (via keyboard: arrow down)', async ({
			page,
			browserName,
		}) => {
			await gotoFrame(
				page,
				storyID,
				'selectOptions:sampleSelectOptionsScrolling',
			);

			await focusViaTab(page, browserName);

			await page.keyboard.press('ArrowDown');

			expect(await page.screenshot({ clip: clipOptions })).toMatchSnapshot(
				'combobox-select__scrolling-a11y-keyboard-arrow-down_listbox-open.png',
			);
		});

		test('Listbox open (via keyboard: arrow up)', async ({
			page,
			browserName,
		}) => {
			await gotoFrame(
				page,
				storyID,
				'selectOptions:sampleSelectOptionsScrolling',
			);

			await focusViaTab(page, browserName);

			await page.keyboard.press('ArrowUp');

			expect(await page.screenshot({ clip: clipOptions })).toMatchSnapshot(
				'combobox-select__scrolling-a11y-keyboard-arrow-up_listbox-open.png',
			);
		});

		test('Option focused (via keyboard: arrow down)', async ({
			page,
			browserName,
		}) => {
			await gotoFrame(
				page,
				storyID,
				'selectOptions:sampleSelectOptionsScrolling',
			);

			await focusViaTab(page, browserName);

			await page.keyboard.press('Enter');
			await page.waitForTimeout(100);

			// arrow down 12 times
			for (let x = 0; x < 12; x++) {
				await page.keyboard.press('ArrowDown');
				await page.waitForTimeout(100);
			}

			expect(await page.screenshot({ clip: clipOptions })).toMatchSnapshot(
				'combobox-select__scrolling-a11y-keyboard-arrow-down_option-focused.png',
			);
		});

		test('Option focused (via keyboard: arrow up)', async ({
			page,
			browserName,
		}) => {
			await gotoFrame(
				page,
				storyID,
				'selectOptions:sampleSelectOptionsScrolling',
			);

			await focusViaTab(page, browserName);

			await page.keyboard.press('Enter');
			await page.waitForTimeout(100);
			await page.keyboard.press('ArrowUp');
			await page.waitForTimeout(100);
			await page.keyboard.press('ArrowUp');

			expect(await page.screenshot({ clip: clipOptions })).toMatchSnapshot(
				'combobox-select__scrolling-a11y-keyboard-arrow-up_option-focused.png',
			);
		});

		test('Render selected option (via keyboard)', async ({
			page,
			browserName,
		}) => {
			await gotoFrame(
				page,
				storyID,
				'selectOptions:sampleSelectOptionsScrolling',
			);

			await focusViaTab(page, browserName);

			await page.keyboard.press('Enter');
			await page.waitForTimeout(100);

			// arrow down 12 times
			for (let x = 0; x < 12; x++) {
				await page.keyboard.press('ArrowDown');
				await page.waitForTimeout(100);
			}

			await page.keyboard.press('Enter');
			await page.waitForTimeout(100);

			const combobox = page.locator('.pds-combobox-select [role="combobox"]');

			// re-open the listbox
			await page.keyboard.press('Enter');

			expect(await page.screenshot({ clip: clipOptions })).toMatchSnapshot(
				'combobox-select__scrolling-a11y-keyboard_option-selected.png',
			);
		});

		test('Render selected option (via mouse)', async ({
			page,
			browserName,
		}) => {
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

			await optionThird.click();

			// re-open listbox
			await combobox.click();

			expect(await page.screenshot({ clip: clipOptions })).toMatchSnapshot(
				'combobox-select__scrolling_option-selected.png',
			);
		});
	});
});
