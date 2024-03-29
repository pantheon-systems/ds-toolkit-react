import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';

const pkg = require('./package.json');

export default [
	{
		input: 'src/index.js',
		output: [
			{ file: pkg.main, format: 'cjs', sourcemap: true, name: 'react-lib' },
			{ file: pkg.module, format: 'esm', sourcemap: true },
		],
		plugins: [
			external(),
			resolve({ extensions: ['.js', '.jsx'] }),
			babel({
				babelHelpers: 'bundled',
				presets: [
					[
						'@babel/preset-react',
						{
							runtime: 'automatic',
						},
					],
				],
			}),
			commonjs(),
			postcss(),
			terser(),
		],
	},
];
