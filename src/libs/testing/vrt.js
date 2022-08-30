const gotoFrame = async (page, destination, args = null) => {
	const showArgs = args ? `&args=${args}` : '';

	await page.goto(`/iframe.html?id=${destination}&viewMode=story${showArgs}`);
	await page.evaluate(() => document.fonts.ready);
};

module.exports = {
	gotoFrame,
};
