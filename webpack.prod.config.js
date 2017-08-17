const path = require('path');
const webpack = require('webpack');
const config = require('./webpack.config.js');

config.plugins.unshift(
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      drop_console: false,
    },
  })
);

module.exports = config;
