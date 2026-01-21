const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	mode: 'development',
	entry: './src/index.tsx',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
		clean: true,
	},

	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},

	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			},
		],
	},

	devServer: {
		static: './dist',
		port: 3000,
		open: true,
		hot: true,
		historyApiFallback: true,
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: './public/index.html',
		}),
	],

}
