const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const cssExtractPlugin=require('mini-css-extract-plugin')

module.exports = {
   entry: './src/main.js',
   output: {
      path: path.join(__dirname, 'dist'),
      filename: 'bundle.js',
      publicPath: '/'
   },
   devServer: {
      inline: true,
      port: 8080
   },
   module: {
      rules: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
         },
	 {
            test: /\.css$/,
            exclude: /node_modules/,
            use: ['style-loader', 'css-loader'],
         }
      ]
   },
   devServer: {
    historyApiFallback: true,
   },
   plugins:[
      new HtmlWebpackPlugin({
         template: './public/index.html'
      }),
      new cssExtractPlugin({
      filename:"[name].[contenthash].css"
      }),
   ]
}
