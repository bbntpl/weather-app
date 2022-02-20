const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin');

module.exports = {
	entry: [
		'./src/index.js',
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
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Daily Weather Report',
			template: './src/template.html',
			favicon: './src/images/icons/favicon.ico',
		}),
		new CopyPlugin({
			patterns: [
				{ from: './src/images/icons', to: './images' },
			],
		}),
	],
	optimization: {
		minimize: true,
		minimizer: [
			new HtmlMinimizerPlugin(),
		],
	},
};
