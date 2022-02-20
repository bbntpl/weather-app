const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
	module: {
		rules: [
			{
				test: /\.((s[ac]|c)ss)$/i,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader',
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: true,
							postcssOptions: {
								plugins: [
									['autoprefixer'],
								],
							},
						},
					},
				],
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
