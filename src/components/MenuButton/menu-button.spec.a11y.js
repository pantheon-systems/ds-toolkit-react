const { test, expect } = require('@playwright/test');
const { gotoFrame } = require('../../../src/libs/testing/vrt');
const { a11yTest } = require('../../../src/libs/testing/a11y');

// enable single file parallelism
test.describe.configure({ mode: 'parallel' });

test.describe('Components/Button', () => {
	test.describe('Default/Secondary', () => {
		test('Base', async ({ page }) => {
			await gotoFrame(page, 'components-button--button');

			const a11yNumViolations = await a11yTest(
				page,
				'components-button__default',
			);

			expect(
				a11yNumViolations,
				`${a11yNumViolations} accessibility issues found.`,
			).toBe(0);
		});

		test('Disabled', async ({ page }) => {
			await gotoFrame(page, 'components-button--button', 'disabled:true');

			const a11yNumViolations = await a11yTest(
				page,
				'components-button__default-disabled',
			);

			expect(
				a11yNumViolations,
				`${a11yNumViolations} accessibility issues found.`,
			).toBe(0);
		});

		test('State: hover', async ({ page }) => {
			await gotoFrame(page, 'components-button--button');

			const button = page.locator('.pds-button');

			await button.hover();

			const a11yNumViolations = await a11yTest(
				page,
				'components-button__default-hover',
			);

			expect(
				a11yNumViolations,
				`${a11yNumViolations} accessibility issues found.`,
			).toBe(0);
		});

		test('State: active', async ({ page }) => {
			await gotoFrame(page, 'components-button--button');

			const button = page.locator('.pds-button');

			await button.hover();
			await page.mouse.down();

			const a11yNumViolations = await a11yTest(
				page,
				'components-button__default-active',
			);

			expect(
				a11yNumViolations,
				`${a11yNumViolations} accessibility issues found.`,
			).toBe(0);
		});

		test('State: focused', async ({ page, browserName }) => {
			await gotoFrame(page, 'components-button--button');

			// Tab to item with keyboard
			let keyPressed = 'Tab';
			if (browserName === 'webkit') {
				keyPressed = 'Alt+Tab';
			}
			await page.keyboard.press(keyPressed);

			const a11yNumViolations = await a11yTest(
				page,
				'components-button__default-focused',
			);

			expect(
				a11yNumViolations,
				`${a11yNumViolations} accessibility issues found.`,
			).toBe(0);
		});
	});

	test.describe('Primary', () => {
		test('Base', async ({ page }) => {
			await gotoFrame(page, 'components-button--button', 'variant:primary');

			const a11yNumViolations = await a11yTest(
				page,
				'components-button__primary',
			);

			expect(
				a11yNumViolations,
				`${a11yNumViolations} accessibility issues found.`,
			).toBe(0);
		});

		test('Disabled', async ({ page }) => {
			await gotoFrame(
				page,
				'components-button--button',
				'variant:primary;disabled:true',
			);

			const a11yNumViolations = await a11yTest(
				page,
				'components-button__primary-disabled',
			);

			expect(
				a11yNumViolations,
				`${a11yNumViolations} accessibility issues found.`,
			).toBe(0);
		});

		test('State: hover', async ({ page }) => {
			await gotoFrame(page, 'components-button--button', 'variant:primary');

			const button = page.locator('.pds-button');

			await button.hover();

			const a11yNumViolations = await a11yTest(
				page,
				'components-button__primary-hover',
			);

			expect(
				a11yNumViolations,
				`${a11yNumViolations} accessibility issues found.`,
			).toBe(0);
		});

		test('State: active', async ({ page }) => {
			await gotoFrame(page, 'components-button--button', 'variant:primary');

			const button = page.locator('.pds-button');

			await button.hover();
			await page.mouse.down();

			const a11yNumViolations = await a11yTest(
				page,
				'components-button__primary-active',
			);

			expect(
				a11yNumViolations,
				`${a11yNumViolations} accessibility issues found.`,
			).toBe(0);
		});

		test('State: focused', async ({ page, browserName }) => {
			await gotoFrame(page, 'components-button--button', 'variant:primary');

			// Tab to item with keyboard
			let keyPressed = 'Tab';
			if (browserName === 'webkit') {
				keyPressed = 'Alt+Tab';
			}
			await page.keyboard.press(keyPressed);

			const a11yNumViolations = await a11yTest(
				page,
				'components-button__primary-focused',
			);

			expect(
				a11yNumViolations,
				`${a11yNumViolations} accessibility issues found.`,
			).toBe(0);
		});
	});

	test.describe('Tertiary', () => {
		test('Base', async ({ page }) => {
			await gotoFrame(page, 'components-button--button', 'variant:tertiary');

			const a11yNumViolations = await a11yTest(
				page,
				'components-button__tertiary',
			);

			expect(
				a11yNumViolations,
				`${a11yNumViolations} accessibility issues found.`,
			).toBe(0);
		});

		test('Disabled', async ({ page }) => {
			await gotoFrame(
				page,
				'components-button--button',
				'variant:tertiary;disabled:true',
			);

			const a11yNumViolations = await a11yTest(
				page,
				'components-button__tertiary-disabled',
			);

			expect(
				a11yNumViolations,
				`${a11yNumViolations} accessibility issues found.`,
			).toBe(0);
		});

		test('State: hover', async ({ page }) => {
			await gotoFrame(page, 'components-button--button', 'variant:tertiary');

			const button = page.locator('.pds-button');

			await button.hover();

			const a11yNumViolations = await a11yTest(
				page,
				'components-button__tertiary-hover',
			);

			expect(
				a11yNumViolations,
				`${a11yNumViolations} accessibility issues found.`,
			).toBe(0);
		});

		test('State: active', async ({ page }) => {
			await gotoFrame(page, 'components-button--button', 'variant:tertiary');

			const button = page.locator('.pds-button');

			await button.hover();
			await page.mouse.down();

			const a11yNumViolations = await a11yTest(
				page,
				'components-button__tertiary-active',
			);

			expect(
				a11yNumViolations,
				`${a11yNumViolations} accessibility issues found.`,
			).toBe(0);
		});

		test('State: focused', async ({ page, browserName }) => {
			await gotoFrame(page, 'components-button--button', 'variant:tertiary');

			// Tab to item with keyboard
			let keyPressed = 'Tab';
			if (browserName === 'webkit') {
				keyPressed = 'Alt+Tab';
			}
			await page.keyboard.press(keyPressed);

			const a11yNumViolations = await a11yTest(
				page,
				'components-button__tertiary-focused',
			);

			expect(
				a11yNumViolations,
				`${a11yNumViolations} accessibility issues found.`,
			).toBe(0);
		});
	});

	test.describe('Critical', () => {
		test('Base', async ({ page }) => {
			await gotoFrame(page, 'components-button--button', 'variant:critical');

			const a11yNumViolations = await a11yTest(
				page,
				'components-button__critical',
			);

			expect(
				a11yNumViolations,
				`${a11yNumViolations} accessibility issues found.`,
			).toBe(0);
		});

		test('Disabled', async ({ page }) => {
			await gotoFrame(
				page,
				'components-button--button',
				'variant:critical;disabled:true',
			);

			const a11yNumViolations = await a11yTest(
				page,
				'components-button__critical-disabled',
			);

			expect(
				a11yNumViolations,
				`${a11yNumViolations} accessibility issues found.`,
			).toBe(0);
		});

		test('State: hover', async ({ page }) => {
			await gotoFrame(page, 'components-button--button', 'variant:critical');

			const button = page.locator('.pds-button');

			await button.hover();

			const a11yNumViolations = await a11yTest(
				page,
				'components-button__critical-hover',
			);

			expect(
				a11yNumViolations,
				`${a11yNumViolations} accessibility issues found.`,
			).toBe(0);
		});

		test('State: active', async ({ page }) => {
			await gotoFrame(page, 'components-button--button', 'variant:critical');

			const button = page.locator('.pds-button');

			await button.hover();
			await page.mouse.down();

			const a11yNumViolations = await a11yTest(
				page,
				'components-button__critical-active',
			);

			expect(
				a11yNumViolations,
				`${a11yNumViolations} accessibility issues found.`,
			).toBe(0);
		});

		test('State: focused', async ({ page, browserName }) => {
			await gotoFrame(page, 'components-button--button', 'variant:critical');

			// Tab to item with keyboard
			let keyPressed = 'Tab';
			if (browserName === 'webkit') {
				keyPressed = 'Alt+Tab';
			}
			await page.keyboard.press(keyPressed);

			const a11yNumViolations = await a11yTest(
				page,
				'components-button__critical-focused',
			);

			expect(
				a11yNumViolations,
				`${a11yNumViolations} accessibility issues found.`,
			).toBe(0);
		});
	});
});
