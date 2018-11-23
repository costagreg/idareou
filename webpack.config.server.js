import path from 'path'
import webpack from 'webpack'
import nodeExternals from 'webpack-node-externals' // Dont run all the innecesary node_modules in node

export default {
  entry: path.join(__dirname, './src/server'),
  externals: [nodeExternals()],
  mode: 'development',
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'server.js'
  },
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
      }
    ]
  },
  target: 'node',
  plugins: [
    new webpack.IgnorePlugin(/\.s?css$/)
  ],
  resolve: {
    extensions: ['.js', '.json', '.jsx'] //Add this in order to dont indicate the extension when import it
  }
}