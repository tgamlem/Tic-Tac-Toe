/** @format */

const path = require("path");
const nodeExternals = require("webpack-node-externals");

const SERVER_PATH = path.join(__dirname, "/server/server.js");

module.exports = {
	entry: SERVER_PATH,
	mode: "development",
	output: {
		path: path.join(__dirname, "dist/"),
		publicPath: "/",
		filename: "server.dev.wp.js",
	},
	target: "node",
	node: {
		__dirname: false,
		__filename: false,
	},
	externals: [nodeExternals()],
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: "babel-loader",
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: [".js"],
	},
};
