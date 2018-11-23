const path = require('path')
const webpack = require('webpack')
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin') // Save HTML in the dist to be readable for fs module

module.exports = {
  entry: [
    'react-hot-loader/patch', // RHL patch
    'webpack-hot-middleware/client',
    path.join(__dirname, '../src/')
  ],
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'main.js',
    publicPath: '/dist/'
  },
  mode: 'development',
  plugins: [
    new HtmlWebpackHarddiskPlugin({
      outputPath: path.join(__dirname, '../dist')
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
}