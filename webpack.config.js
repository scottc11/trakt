let path = require('path');
let webpack = require('webpack');
let BundleTracker = require('webpack-bundle-tracker');
var ExtractTextPlugin = require("extract-text-webpack-plugin");


module.exports = {
  // the base directry (absolute path) for resolving the entry option
  context: __dirname,

  // the entry point we created earlier. Note that './' means
  // your current directory. You don't have to specify the extension now,
  // because you will specify extensions later in the `resolve` section
  entry: {
    'app': './assets/js/index.js',
    'upload': './assets/js/scripts/uploadAudioFile.js'
  },

  output: {
    // where you want your compiled bundle to be stored
    path: path.resolve('./static/bundles/'),
    filename: '[name].bundle.js',
  },

  plugins: [
    // telss webpack where to store data about your bundles
    new BundleTracker({filename: './webpack-stats.json'}),
    new ExtractTextPlugin("[name].css"),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    })
  ],

  module: {
    loaders: [
      // a regexp that tells webpack to use the following loads on all .js and .jsx files
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: { presets: ['react', 'es2015'] }
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract([ 'css-loader', 'less-loader' ])
      }
    ]
  },
  watchOptions: {
    aggregateTimeout: 100,
    ignored: /node_modules/,
    poll: 1000
  },

  resolve: {
    // tells webpack where to look for modules
    modules: ['node_modules'],
    extensions: ['.js', '.jsx']
  }
}
