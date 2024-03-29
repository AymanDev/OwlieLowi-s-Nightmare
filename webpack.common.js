const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  target: 'web',
  output: {
    filename: '[name].[contenthash].js',
    sourceMapFilename: '[file].map',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: '[name].[hash][ext][query]'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif|wav)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.js$/,
        use: ['source-map-loader'],
        exclude: [path.resolve(__dirname, 'node_modules/excalibur')],
        enforce: 'pre'
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebPackPlugin({
      template: './template/index.html'
    })
  ]
};
