const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './demo/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'demo')],
        loader: 'babel-loader',
        options: {
          presets: ['react'],
        },
      },
      {
        test: /\.less$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }, { loader: 'less-loader' }],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  target: 'web',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    watchContentBase: true,
    port: 9000,
  },
  plugins: [new CopyWebpackPlugin([{ from: 'demo/index.html' }])],
};
