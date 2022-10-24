const { test, expect } = require('@playwright/test');
const { gotoFrame, focusViaTab } = require('../../libs/testing/vrt');

const storyID = 'components-toasts--toasts';
const storyID_dismissible = 'components-toasts--toasts-dismissible';
const storyID_autodismiss = 'components-toasts--toasts-auto-dismiss';

const {
	toastsSimple,
	toastsSomeDismissible,
	toastsOneAutoDismiss,
	autoDismissTimeInSeconds,
} = require('./toasts-sample-data');

// enable single file parallelism
test.describe.configure({ mode: 'parallel' });

test.describe('Components/Toasts', () => {
	test('Default', async ({ page }) => {
		await gotoFrame(page, storyID);

		// required to allow animations to complete
		await page.waitForTimeout(2000);

		expect(await page.screenshot()).toMatchSnapshot('toasts__default.png');
	});

	test('Position: start-start', async ({ page }) => {
		await gotoFrame(page, storyID, 'position:start-start');

		// required to allow animations to complete
		await page.waitForTimeout(2000);

		expect(await page.screenshot()).toMatchSnapshot(
			'toasts__position_start-start.png',
		);
	});

	test('Position: start-end', async ({ page }) => {
		await gotoFrame(page, storyID, 'position:start-end');

		// required to allow animations to complete
		await page.waitForTimeout(2000);

		expect(await page.screenshot()).toMatchSnapshot(
			'toasts__position_start-end.png',
		);
	});

	test('Position: end-start', async ({ page }) => {
		await gotoFrame(page, storyID, 'position:end-start');

		// required to allow animations to complete
		await page.waitForTimeout(2000);

		expect(await page.screenshot()).toMatchSnapshot(
			'toasts__position_end-start.png',
		);
	});

	test('Position: end-end', async ({ page }) => {
		await gotoFrame(page, storyID, 'position:end-end');

		// required to allow animations to complete
		await page.waitForTimeout(2000);

		expect(await page.screenshot()).toMatchSnapshot(
			'toasts__position_end-end.png',
		);
	});

	test('Dismissible', async ({ page }) => {
		await gotoFrame(page, storyID_dismissible);

		// required to allow animations to complete
		await page.waitForTimeout(2000);

		expect(await page.screenshot()).toMatchSnapshot('toasts__dismissible.png');
	});

	test('Dismissible: dismiss one', async ({ page }) => {
		await gotoFrame(page, storyID_dismissible);

		// required to allow animations to complete
		await page.waitForTimeout(2000);

		const toastID = toastsSomeDismissible[3].id;

		const toastDismissButton = await page.locator(
			`#${toastID} .pds-toast__dismiss`,
		);
		await toastDismissButton.click();

		// required to allow animations to complete
		await page.waitForTimeout(2000);

		expect(await page.screenshot()).toMatchSnapshot(
			'toasts__dismissible-dismissed.png',
		);
	});

	test('Auto-dismiss', async ({ page }) => {
		await gotoFrame(page, storyID_autodismiss);

		const dismissDelay = autoDismissTimeInSeconds * 1000;

		// required to allow animations to complete (initial and auto-dismiss)
		await page.waitForTimeout(2000 + dismissDelay);

		expect(await page.screenshot()).toMatchSnapshot('toasts__auto-dismiss.png');
	});
});
