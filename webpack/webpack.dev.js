const merge = require('webpack-merge');
const common = require('./webpack.base.js');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = merge(common, {

  devtool: 'inline-source-map',

  output: {
    filename: '[name].bundle.js'
  },

  plugins: [
    new ExtractTextPlugin("[name].css"),
  ]

});
