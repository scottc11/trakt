const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.base.js');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = merge(common, {

  output: {
    filename: '[name].bundle.[chunkhash].js'
  },

  plugins: [
    new ExtractTextPlugin("[name].[chunkhash].css"),
    new UglifyJsPlugin(),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: { removeAll: true } }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]

});
