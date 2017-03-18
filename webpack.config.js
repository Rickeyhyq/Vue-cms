'use strict'
const path = require('path')

module.exports = {
  entry: './src/main.js', // 打包的总入口文件
  output: {
    path: path.join(__dirname, 'dist'), // 打包到dist目录
    filename: 'bundle.js' // 最终打包生成bundle.js
  },
  module: {
    // 配置loader
    loaders: [{
      test: /\.vue$/,
      loader: 'vue-loader'
    }]
  }
}