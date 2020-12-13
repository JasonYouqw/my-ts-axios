const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const getEntry = require('./getEntry');

module.exports = {
  mode: 'development',
  entry: getEntry(),
  output: {
    path: path.resolve(__dirname, '__build__'),
    filename: '[name].js',
    publicPath: '/__build__/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        enforce: 'pre',
        use: [
          {
            loader: 'tslint-loader',
          }
        ]
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader', 'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
}
