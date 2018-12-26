const merge = require('webpack-merge');
const common = require('./webpack.base.js');

module.exports = merge(common, {

  mode: 'development',

  devtool: 'inline-source-map',

  output: {
    filename: '[name].bundle.js'
  }

});
