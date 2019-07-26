const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
// Dev environment unless production is set explictitly
const DEV = process.env.NODE_ENV !== 'production';

const config = {
  entry: ['babel-polyfill', './src/index.js'],
  // entry: path.join(__dirname, '/app/index.js'),

  output: {
    path: path.join(__dirname, '/build'),
    filename: 'index.js'
  },

  devServer: {
    contentBase: './build',
    hot: true,
    noInfo: false,
    port: 2015,
  },

  module: {
    rules: [
      // JS.
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['es2015', 'react'],
          plugins: ['transform-object-rest-spread']
        }
      },
      // HTML.
      {
        test: /\.html$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      },
      // CSS.
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
      },
      // SCSS.
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
      },
      {
        test: /\.(otf|eot|svg|ttf|woff|woff2)(\?.+)$/,
        loader: 'url-loader',
        options: {
          limit: '8192'
        }
      },
      // SVG.
      {
        test: /\.svg$/,
        loader: 'url-loader',
        options: {
          limit: '10000',
          mimetype: 'image/svg+xml'
        }
      },
      // Images.
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader',
        options: {
          limit: '8192',
          name: '[name]_[sha512:hash:base64:7].[ext]'
        }
      },
      // Fonts.
      {
        test: /\.(csv|ttf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
        use: 'file-loader'
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.html', '.json', '.jsx'],
    modules: [
      path.join(__dirname, '/build'),
      'node_modules'
    ]
  },

  plugins: [
    new CopyWebpackPlugin([
      { from: './src/static', to: 'static' },
      { from: './public/index.html' }
    ], { copyUnmodified: true }),
    new ExtractTextPlugin({ filename: 'style.css',
      allChunks: true
    }),
    new webpack.ProvidePlugin({
      Promise: 'imports-loader?this=>global!exports-loader?global.Promise!es6-promise',
      fetch: 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch'
    })
  ]
};

// If environment is not production
if (DEV) {
  console.log('🛠  DEV environment detected 🛠'); // eslint-disable-line
} else {
  console.log('🌎  PROD environment detected 🌎'); // eslint-disable-line
  config.plugins.push(
    // As per https://github.com/reactjs/redux/issues/1029
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('"production"')
      },
    }),
    new webpack.optimize.UglifyJsPlugin()
  );
}

module.exports = config;
