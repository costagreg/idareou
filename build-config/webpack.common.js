const path = require('path')
const webpack = require('webpack')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtraPlugin = require('mini-css-extract-plugin')

module.exports = {
  name: 'client',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'extracted-loader',
          MiniCssExtraPlugin.loader,
          'css-loader',
          'sass-loader?sourceMap'
        ]
      },
      {
        test: /\.(png|jpg|gif|svg|ttf|woff|eot|woff2)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx']
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, '../src/index.html'),
      filename: 'publicIndex.html',
      alwaysWriteToDisk: true, // in order to make expressWebpackMiddleware works
      inject: 'body'
    }),
    new MiniCssExtraPlugin({
      filename: '[name].css'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        ENV: JSON.stringify(process.env.ENV)
      }
    })
  ]
}