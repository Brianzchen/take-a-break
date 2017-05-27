var path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src/main.js'),
  output: { path: path.resolve(__dirname, 'dist/'), filename: 'index.js' },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.css'],
    modules: [
      path.resolve('./src'),
      path.resolve('./node_modules'),
    ],
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'es2016', 'es2017', 'react'],
          plugins: ['transform-class-properties'],
        },
      },
    ],
  },
};
