const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
	module: {
		rules: [
			{
				test: /.s?css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
			},
			{
				test: /\.html$/i,
				type: 'asset/resource',
			},
		],
	},
	optimization: {
		minimizer: [
			new CssMinimizerPlugin(),
			new HtmlMinimizerPlugin(),
		],
	},
	plugins: [
		new MiniCssExtractPlugin(),
	],
};
