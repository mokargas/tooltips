const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const devMode = process.env.NODE_ENV !== 'production';

const VERSION = JSON.stringify(require('./package.json').version).replace(/(^")|("$)/g, '');

module.exports = {
  target: 'web',
  entry: './index.js',
  mode: devMode ? 'development' : 'production',
  stats: 'errors-only',
  output: {
    filename: 'ui.js',
    path: path.resolve(process.cwd(), 'dist'),
    publicPath: '/',
  },
  optimization: {
    minimize: !devMode,
    minimizer: [new TerserPlugin({parallel: true})],
  },
  resolve: {
    modules: ['node_modules', path.resolve(__dirname, './src')],
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        },
      },
      {
        test: /\.module\.s(a|c)ss$/,
        loader: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]_[local]_[hash:base64:5]',
              },
              sourceMap: devMode,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: devMode,
            },
          },
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /\.module.(s(a|c)ss)$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: devMode,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      VERSION,
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    }),
    new HtmlWebpackPlugin({
      inject: 'body',
      template: path.resolve(__dirname, 'templates/index.html'),
      title: `Tooltips (${VERSION}-${devMode ? 'dev' : 'prod'})`,
    }),
  ],
};
