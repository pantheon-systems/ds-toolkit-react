const { test, expect } = require('@playwright/test');
const { gotoFrame, focusViaTab } = require('../../libs/testing/vrt');

const storyID = 'components-alerts-inline--alert-inline';

// enable single file parallelism
test.describe.configure({ mode: 'parallel' });

test.describe('Components/Alerts/Inline', () => {
	test('Type: info', async ({ page }) => {
		await gotoFrame(page, storyID);

		expect(await page.screenshot()).toMatchSnapshot(
			'alert-inline__type-info.png',
		);
	});

	test('Type: success', async ({ page }) => {
		await gotoFrame(page, storyID, 'type:success');

		expect(await page.screenshot()).toMatchSnapshot(
			'alert-inline__type-success.png',
		);
	});

	test('Type: warning', async ({ page }) => {
		await gotoFrame(page, storyID, 'type:warning');

		expect(await page.screenshot()).toMatchSnapshot(
			'alert-inline__type-warning.png',
		);
	});

	test('Type: error', async ({ page }) => {
		await gotoFrame(page, storyID, 'type:error');

		expect(await page.screenshot()).toMatchSnapshot(
			'alert-inline__type-error.png',
		);
	});

	test('Type: pantheon', async ({ page }) => {
		await gotoFrame(page, storyID, 'type:pantheon');

		expect(await page.screenshot()).toMatchSnapshot(
			'alert-inline__type-pantheon.png',
		);
	});

	test('Dismissible', async ({ page }) => {
		await gotoFrame(page, 'components-alerts-inline--alert-inline-dismissible');

		expect(await page.screenshot()).toMatchSnapshot(
			'alert-inline__dismissible.png',
		);
	});
});
