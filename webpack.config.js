'use strict'
const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/main.js', // 打包的总入口文件
  output: {
    path: path.join(__dirname, 'dist'), // 打包到dist目录
    filename: 'bundle.js' // 最终打包生成bundle.js
  },
  module: {
    // 配置loader
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.ttf$/,
        loader: 'url-loader?limit=4000'
      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      title: 'index',
      filename: 'index.html',
      template: './dist/indextem.html'
    })
  ]
}