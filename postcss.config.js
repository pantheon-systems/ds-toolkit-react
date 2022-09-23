const postcssDesignTokens = require('@csstools/postcss-design-tokens');
const postcssCustomMedia = require('postcss-custom-media');

module.exports = {
	plugins: [
		require('cssnano'),
		require('postcss-import'),
		require('postcss-nested'),
		postcssDesignTokens({ valueFunctionName: 'token' }),
		postcssCustomMedia({
			importFrom: [
				{
					customMedia: {
						'--small-viewport': 'only screen and (max-width: 640px)',
						'--medium-viewport':
							'only screen and (min-width: 641px) and (max-width: 1024px)',
						'--large-viewport': 'only screen and (min-width: 1025px)',
					},
				},
			],
		}),
	],
};
