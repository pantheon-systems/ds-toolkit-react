const gotoFrame = async (page, destination, args = null) => {
	const showArgs = args ? `&args=${args}` : '';

	await page.goto(`/iframe.html?id=${destination}&viewMode=story${showArgs}`);
	await page.evaluate(() => document.fonts.ready);
};

const focusViaTab = async (page, browserName) => {
	// Tab to item with keyboard
	let keyPressed = 'Tab';
	if (browserName === 'webkit') {
		keyPressed = 'Alt+Tab';
	}
	await page.keyboard.press(keyPressed);
};

module.exports = {
	gotoFrame,
	focusViaTab,
};
