const path = require('path')
const MiniCssExtraPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: path.join(__dirname, '../src/'),
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'main-[hash].js',
    publicPath: '/dist/'
  },
  mode: 'production',
  plugins: [
    new MiniCssExtraPlugin({
      filename: '[name][hash].css'
    }),
  ]
}