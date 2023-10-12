const path = require('path');
const FileManagerPlugin = require('filemanager-webpack-plugin');

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
  ],
};