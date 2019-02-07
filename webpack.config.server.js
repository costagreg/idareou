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
    new webpack.IgnorePlugin(/\.s?css$/),
    new webpack.DefinePlugin({
      'process.env': {
        ENV: JSON.stringify(process.env.ENV),
        GRAPHQL_URL: JSON.stringify(process.env.GRAPHQL_URL)
      }
    })
  ],
  resolve: {
    extensions: ['.mjs', '.js', '.json', '.jsx'],
    alias: {
      src: path.resolve(__dirname, './src')
    }
  }
}
