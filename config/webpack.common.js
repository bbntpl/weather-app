const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: './src/index.js',
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/template.html',
			favicon: './src/images/favicon.ico',
		}),
		new CopyPlugin({
			patterns: [
				{ from: './src/images/logo.svg', to: './images' },
				{ from: './src/images/search.svg', to: './images' },
				{ from: './src/images/favicon.ico', to: './images' },
			],
		}),
	],
	output: {
		path: path.resolve(__dirname, '..', 'dist'),
		clean: true,
	},
	module: {
		rules: [
			{
				test: /\.((s[ac]|c)ss)$/i,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
			},
		],
	},
};
