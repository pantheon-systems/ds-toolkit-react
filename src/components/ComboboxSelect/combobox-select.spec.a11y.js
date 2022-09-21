const { test, expect } = require('@playwright/test');
const { gotoFrame, focusViaTab } = require('../../../src/libs/testing/vrt');
const { a11yTest } = require('../../../src/libs/testing/a11y');

const storyID = 'components-combobox-select--combobox-select';

// enable single file parallelism
test.describe.configure({ mode: 'parallel' });

test.describe('Components/Combobox select', () => {
	test('Base', async ({ page }) => {
		await gotoFrame(page, storyID);

		const a11yNumViolations = await a11yTest(
			page,
			'components-combobox-select__default',
		);

		expect(
			a11yNumViolations,
			`${a11yNumViolations} accessibility issues found.`,
		).toBe(0);
	});

	test('State: focused', async ({ page, browserName }) => {
		await gotoFrame(page, storyID);

		await focusViaTab(page, browserName);

		const a11yNumViolations = await a11yTest(
			page,
			'components-combobox-select__default-focused',
		);

		expect(
			a11yNumViolations,
			`${a11yNumViolations} accessibility issues found.`,
		).toBe(0);
	});

	test('Listbox open (via mouse)', async ({ page }) => {
		await gotoFrame(page, storyID);

		const combobox = page.locator('.pds-combobox-select [role="combobox"]');
		await combobox.click();

		const a11yNumViolations = await a11yTest(
			page,
			'components-combobox-select__default-listbox-open-mouse',
		);

		expect(
			a11yNumViolations,
			`${a11yNumViolations} accessibility issues found.`,
		).toBe(0);
	});

	test('Listbox open (via keyboard: enter)', async ({ page, browserName }) => {
		await gotoFrame(page, storyID);

		await focusViaTab(page, browserName);

		await page.keyboard.press('Enter');

		const a11yNumViolations = await a11yTest(
			page,
			'components-combobox-select__default-listbox-open-keyboard-enter',
		);

		expect(
			a11yNumViolations,
			`${a11yNumViolations} accessibility issues found.`,
		).toBe(0);
	});

	test('Option focused (via keyboard: arrow down)', async ({
		page,
		browserName,
	}) => {
		await gotoFrame(page, storyID);

		await focusViaTab(page, browserName);

		await page.keyboard.press('Enter');
		await page.keyboard.press('ArrowDown');
		await page.keyboard.press('ArrowDown');

		const a11yNumViolations = await a11yTest(
			page,
			'components-combobox-select__default-option-focused-keyboard',
		);

		expect(
			a11yNumViolations,
			`${a11yNumViolations} accessibility issues found.`,
		).toBe(0);
	});
});
