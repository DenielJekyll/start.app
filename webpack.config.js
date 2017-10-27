const path = require('path')
const webpack = require('webpack')

const dotenv = require('dotenv').config() // eslint-disable-line no-unused-vars

const optimize = (process.env.NODE_ENV === 'production')

module.exports = {
  entry: path.resolve(__dirname, 'client/start.js'),
  output: {
    path: path.resolve(__dirname, 'static'),
    publicPath: '/',
    filename: 'app.js',
  },
  resolve: {
    modules: ['client', 'common', 'node_modules'],
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: path.resolve(__dirname, 'node_modules'), use: [{ loader: 'babel-loader' }] },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: optimize ? '"production"' : '"development"' },
    }),
  ],
}

if (optimize) {
  const Uglify = require('uglifyjs-webpack-plugin')

  module.exports.plugins.push(new Uglify({ uglifyOptions: {
    compress: {
      ecma: 7,
      warnings: true,
    },
    mangle: {
      'keep_quoted': true,
      reserved: [],
    },
  } }))
}
