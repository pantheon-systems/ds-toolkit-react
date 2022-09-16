const { test, expect } = require('@playwright/test');
const { gotoFrame, focusViaTab } = require('../../../src/libs/testing/vrt');
const { a11yTest } = require('../../../src/libs/testing/a11y');

// enable single file parallelism
test.describe.configure({ mode: 'parallel' });

test.describe('Components/Menu Button', () => {
	test('Base', async ({ page }) => {
		await gotoFrame(page, 'components-menu-button--menu-button');

		const a11yNumViolations = await a11yTest(
			page,
			'components-menu-button__default',
		);

		expect(
			a11yNumViolations,
			`${a11yNumViolations} accessibility issues found.`,
		).toBe(0);
	});

	test('State: hover', async ({ page }) => {
		await gotoFrame(page, 'components-menu-button--menu-button');

		const button = page.locator('.pds-menu-button');

		await button.hover();

		const a11yNumViolations = await a11yTest(
			page,
			'components-menu-button__default-hover',
		);

		expect(
			a11yNumViolations,
			`${a11yNumViolations} accessibility issues found.`,
		).toBe(0);
	});

	test('State: active', async ({ page }) => {
		await gotoFrame(page, 'components-menu-button--menu-button');

		const button = page.locator('.pds-menu-button');

		await button.hover();
		await page.mouse.down();

		const a11yNumViolations = await a11yTest(
			page,
			'components-menu-button__default-active',
		);

		expect(
			a11yNumViolations,
			`${a11yNumViolations} accessibility issues found.`,
		).toBe(0);
	});

	test('State: focused', async ({ page, browserName }) => {
		await gotoFrame(page, 'components-menu-button--menu-button');

		await focusViaTab(page, browserName);

		const a11yNumViolations = await a11yTest(
			page,
			'components-menu-button__default-focused',
		);

		expect(
			a11yNumViolations,
			`${a11yNumViolations} accessibility issues found.`,
		).toBe(0);
	});

	test('Menu open (via mouse)', async ({ page }) => {
		await gotoFrame(page, 'components-menu-button--menu-button');

		const button = page.locator('.pds-menu-button');
		await button.click();

		const a11yNumViolations = await a11yTest(
			page,
			'components-menu-button__default-menu-open-mouse',
		);

		expect(
			a11yNumViolations,
			`${a11yNumViolations} accessibility issues found.`,
		).toBe(0);
	});

	test('Menu open (via keyboard: enter)', async ({ page, browserName }) => {
		await gotoFrame(page, 'components-menu-button--menu-button');

		const button = page.locator('.pds-menu-button');

		await focusViaTab(page, browserName);

		await page.keyboard.press('Enter');

		const a11yNumViolations = await a11yTest(
			page,
			'components-menu-button__default-menu-open-keyboard-enter',
		);

		expect(
			a11yNumViolations,
			`${a11yNumViolations} accessibility issues found.`,
		).toBe(0);
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

		const a11yNumViolations = await a11yTest(
			page,
			'components-menu-button__default-menu-item-focused-keyboard',
		);

		expect(
			a11yNumViolations,
			`${a11yNumViolations} accessibility issues found.`,
		).toBe(0);
	});
});
