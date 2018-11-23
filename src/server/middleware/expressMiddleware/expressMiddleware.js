import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

import clienWebpack from '../../../../webpack.config'
import serverWebpack from '../../../../webpack.config.server'

export default app => {
  const clientConfig = clienWebpack()
  const compiler = webpack([clienWebpack(), serverWebpack])
  const clientCompiler = compiler.compilers.find(({ name }) => name === 'client') // Config HMR

  app.use(webpackMiddleware(compiler, {
    filename: clientConfig.output.filename,
    stats: {
      colors: true
    },
    hot: true, // Enable HMR
    publicPath: clientConfig.output.publicPath,
    serverSideRender: true
  }))

  app.use(webpackHotMiddleware(clientCompiler)) // Enable HMR

  /*
    This is where the magic happens for the SSR hot reload.
    It will clear the require cache and require in the new files
    with the new code.
  */
  compiler.plugin('done', () => {
    Object.keys(require.cache).forEach((id) => {
      // Only delete cache for files in server and shared folders
      if (!/[\/\\]node_modules[\/\\]/.test(id)) {
        delete require.cache[id]
      }
    })
  })
}