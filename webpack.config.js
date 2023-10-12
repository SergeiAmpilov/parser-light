const path = require('path');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); 

module.exports = {
  entry: './source/scripts/index.js',
  output: {
    path: path.resolve(__dirname, 'public/dist'),
    filename: 'index.js',
  },
  plugins: [
    new FileManagerPlugin({
      events: {
        onStart: {
          delete: [ path.resolve(__dirname, 'public/dist'), ],
        },
      },
    }),
    new MiniCssExtractPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, {
          loader: 'css-loader'
        }]
      },
    ],
  },
};