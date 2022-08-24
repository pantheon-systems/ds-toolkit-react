const postcssDesignTokens = require('@csstools/postcss-design-tokens');

module.exports = {
	plugins: [
		require('postcss-import'),
		require('postcss-nested'),
		postcssDesignTokens({ valueFunctionName: 'token' }),
		require('cssnano'),
	],
};
