var webpack=require('webpack');
var path=require('path');
var HtmlWebpackPlugin=require('html-webpack-plugin');

const webpackBundleAnalyzer=require('webpack-bundle-analyzer');
const cssExtractPlugin=require('mini-css-extract-plugin');

process.env.NODE_ENV='production';

module.exports={
  
  mode:'production',
  target:'web',
  devtool:'source-map',
  entry:'./src/main',
  output:{
    path:path.resolve(__dirname,"dist"),
    publicPath:'/',
    filename:'bundle.js'
  },
  plugins:[
    
    new webpackBundleAnalyzer.BundleAnalyzerPlugin({analyzerMode:"static"}),
    
    new cssExtractPlugin({
      filename:"[name].[contenthash].css"
    }),
    
    new HtmlWebpackPlugin({
      template:'./public/index.html',
      removeComments:true,
      collapseWhitespace:true,
      removeReduntantAttributes:true,
      useShortDoctype:true,
      removeEmptyAttributes:true,
      removeStyleLinkTypeAttributes:true,
      removeClosingSlash:true,
      minifyCSS:true,
      minifyJS:true,
      minifyURLs:true
    })
    
  ],
  module:{
    rules:[
      {
        test:/\.(js|jsx)$/,
        exclude:/node_modules/,
        use:["babel-loader"]
      },
      {
        test:/(\.css)$/,
        use:[
          
          cssExtractPlugin.loader,
          {
            loader:"css-loader",
            options:{
              sourceMap:true
            }
          },
          {
            loader:"postcss-loader",
            options:{
              plugins:()=>[require("cssnano")],
              sourceMap:true
            }
          }
        ]
      }
      
    ]
  }
}
