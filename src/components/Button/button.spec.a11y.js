const { test, expect } = require('@playwright/test');
const { gotoFrame, focusViaTab } = require('../../../src/libs/testing/vrt');
const { a11yTest } = require('../../../src/libs/testing/a11y');

const storyID = 'components-buttons--button';

// enable single file parallelism
test.describe.configure({ mode: 'parallel' });

test.describe('Components/Buttons/Button', () => {
	test.describe('Default/Secondary', () => {
		test('Base', async ({ page }) => {
			await gotoFrame(page, storyID);

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
			await gotoFrame(page, storyID, 'disabled:true');

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
			await gotoFrame(page, storyID);

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
			await gotoFrame(page, storyID);

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
			await gotoFrame(page, storyID);

			await focusViaTab(page, browserName);

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
			await gotoFrame(page, storyID, 'variant:primary');

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
			await gotoFrame(page, storyID, 'variant:primary;disabled:true');

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
			await gotoFrame(page, storyID, 'variant:primary');

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
			await gotoFrame(page, storyID, 'variant:primary');

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
			await gotoFrame(page, storyID, 'variant:primary');

			await focusViaTab(page, browserName);

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

	test.describe('Subtle', () => {
		test('Base', async ({ page }) => {
			await gotoFrame(page, storyID, 'variant:subtle');

			const a11yNumViolations = await a11yTest(
				page,
				'components-button__subtle',
			);

			expect(
				a11yNumViolations,
				`${a11yNumViolations} accessibility issues found.`,
			).toBe(0);
		});

		test('Disabled', async ({ page }) => {
			await gotoFrame(page, storyID, 'variant:subtle;disabled:true');

			const a11yNumViolations = await a11yTest(
				page,
				'components-button__subtle-disabled',
			);

			expect(
				a11yNumViolations,
				`${a11yNumViolations} accessibility issues found.`,
			).toBe(0);
		});

		test('State: hover', async ({ page }) => {
			await gotoFrame(page, storyID, 'variant:subtle');

			const button = page.locator('.pds-button');

			await button.hover();

			const a11yNumViolations = await a11yTest(
				page,
				'components-button__subtle-hover',
			);

			expect(
				a11yNumViolations,
				`${a11yNumViolations} accessibility issues found.`,
			).toBe(0);
		});

		test('State: active', async ({ page }) => {
			await gotoFrame(page, storyID, 'variant:subtle');

			const button = page.locator('.pds-button');

			await button.hover();
			await page.mouse.down();

			const a11yNumViolations = await a11yTest(
				page,
				'components-button__subtle-active',
			);

			expect(
				a11yNumViolations,
				`${a11yNumViolations} accessibility issues found.`,
			).toBe(0);
		});

		test('State: focused', async ({ page, browserName }) => {
			await gotoFrame(page, storyID, 'variant:subtle');

			await focusViaTab(page, browserName);

			const a11yNumViolations = await a11yTest(
				page,
				'components-button__subtle-focused',
			);

			expect(
				a11yNumViolations,
				`${a11yNumViolations} accessibility issues found.`,
			).toBe(0);
		});
	});

	test.describe('Critical', () => {
		test('Base', async ({ page }) => {
			await gotoFrame(page, storyID, 'variant:critical');

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
			await gotoFrame(page, storyID, 'variant:critical;disabled:true');

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
			await gotoFrame(page, storyID, 'variant:critical');

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
			await gotoFrame(page, storyID, 'variant:critical');

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
			await gotoFrame(page, storyID, 'variant:critical');

			await focusViaTab(page, browserName);

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
