var webpack = require('webpack');
var postcssImport = require('postcss-import');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.js',

  output: {
    path: './dist',
    filename: 'index.js'
  },

  postcss: function(webpack) {
    return [
      // Order matters!
      postcssImport({
        addDependencyTo: webpack
      }),
      require('postcss-custom-properties'),
      require('postcss-color-function'),
      require('postcss-cssnext')
    ];
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new CleanWebpackPlugin(['dist'], {
      root: __dirname,
      verbose: true,
      dry: false
    }),
    new CopyWebpackPlugin([{
      from: 'src/assets',
      to: 'assets'
    }]),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false
      }
    })
  ],

  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.elm', '.css']
  },

  module: {
    loaders: [{
      test: /\.html$/,
      exclude: /node_modules/,
      loader: 'file?name=[name].[ext]'
    }, {
      test: /\.elm$/,
      exclude: [/elm-stuff/, /node_modules/],
      loader: 'elm-hot!elm-webpack'
    }, {
      test: /\.js$/,
      loaders: ['babel'],
      exclude: [/elm-stuff/, /node_modules/]
    }, {
      test: /\.css?$/,
      loader: 'style!css!postcss',
      include: __dirname
    }, {
      test: /\.jpg/,
      loader: 'url?limit=10000&mimetype=image/jpg'
    }, {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=8192&mimetype=image/svg+xml'
    }, {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=8192&mimetype=application/font-sfnt'
    }, {
      test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=8192&mimetype=application/font-woff'
    }, {
      test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=8192&mimetype=application/font-woff'
    }, {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'file'
    }],

    noParse: /\.elm$/

  }
};
