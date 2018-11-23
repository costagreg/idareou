const webpackMerge = require('webpack-merge')
const webpackCommon = require('./build-config/webpack.common.js')
const webpackDev = require('./build-config/webpack.dev.js')
const webpackProd = require('./build-config/webpack.prod.js')

module.exports = () => {
  const currentConfig = process.env.ENV === 'dev' ? webpackDev : webpackProd
  const merged = webpackMerge(webpackCommon, currentConfig)

  return merged
}