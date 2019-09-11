//  代码清单 4-2 一个webpack.config.js文件
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './app/index.jsx', // 输入文件
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/assets/'
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/, // 匹配所有的JSX文件
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react'] // 使用Babel ES2015和React插件
        }
      }
    ]
  },
}
