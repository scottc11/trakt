const path = require('path');
const webpack = require('webpack');
const BundleTracker = require('webpack-bundle-tracker');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = {
  // the base directry (absolute path) for resolving the entry option
  context: process.cwd(),

  // the entry point we created earlier. Note that './' means
  // your current directory. You don't have to specify the extension now,
  // because you will specify extensions later in the `resolve` section
  entry: {
    'app': './assets/js/index.js',
    'upload': './assets/js/scripts/uploadAudioFile.js'
  },

  output: {
    // where you want your compiled bundle to be stored
    path: path.resolve('./main/static/bundles/'),
    filename: '[name].bundle.js',
  },

  plugins: [
    // telss webpack where to store data about your bundles
    new BundleTracker({filename: './webpack-stats.json'}),
    new ExtractTextPlugin("[name].css"),
    new CleanWebpackPlugin(
      ['./main/static/bundles/'],
      { root: process.cwd() }
    ),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    })
  ],

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: { presets: ['react'] }
      },
      // LESS/CSS
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract([ 'css-loader', 'less-loader' ])
      },
      // IMAGES
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      // FONTS
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },

  watchOptions: {
    aggregateTimeout: 100,
    ignored: /node_modules/,
    poll: true
  },

  resolve: {
    // tells webpack where to look for modules
    modules: ['node_modules'],
    extensions: ['.js', '.jsx']
  }
}
