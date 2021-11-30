/**
 * @author Michael Gamlem III
 * @copyright This file is subject to the terms and conditions defined in file 'LICENSE', which is part of the source code for this project.
 * @format
 */

const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const compressionRegex = /\.(js|png|jpg|html|css)$/;

module.exports = {
	mode: "production",
	entry: path.join(__dirname, "/src/index.jsx"),
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				loader: "babel-loader",
				exclude: /node_modules/,
			},
			{
				test: /\.(s*)css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					{
						loader: "css-loader",
						options: {
							modules: {
								localIdentName: "[contenthash]",
							},
						},
					},
					"sass-loader",
				],
			},
			{
				test: /\.(jpg|png|ico)$/,
				loader: "file-loader",
			},
		],
	},
	resolve: {
		extensions: [".jsx", ".js"],
	},
	output: {
		globalObject: "this",
		path: path.resolve(__dirname, "dist/"),
		publicPath: "/",
		filename: "main.[contenthash].wp.js",
		chunkFilename: "[contenthash].js",
	},
	optimization: {
		nodeEnv: "production",
		splitChunks: {
			chunks: "all",
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: "vendors",
					chunks: "all",
				},
			},
		},
		minimizer: [new TerserPlugin(), new CssMinimizerWebpackPlugin()],
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: "Tic Tac Toe",
			minify: true,
			template: "./public/index.html",
		}),
		new MiniCssExtractPlugin({
			filename: "[contenthash].css",
			chunkFilename: "[id].css",
			ignoreOrder: false,
		}),
		new CompressionPlugin({
			filename: "[path][base].br",
			algorithm: "brotliCompress",
			test: compressionRegex,
		}),
		new CompressionPlugin({
			filename: "[path][base].gz",
			test: compressionRegex,
		}),
	],
};
