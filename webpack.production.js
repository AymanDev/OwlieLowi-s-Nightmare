const { merge } = require('webpack-merge');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const common = require('./webpack.common');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          mangle: true,
          compress: true
        }
      })
    ]
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          '@teamsupercell/typings-for-css-modules-loader',
          { loader: 'css-loader', options: { modules: true } },
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [new CompressionWebpackPlugin(), new MiniCssExtractPlugin({ filename: '[name].[hash].css' })]
});
