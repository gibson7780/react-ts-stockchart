const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const port = process.env.PORT || 3000;

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader', // css插在head內
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]_[local]_[hash:base64:5]', // 讓class有可讀性
                exportLocalsConvention: 'camelCase', // 引入的css如果是custom-card可寫成駝峰customCard
              },
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  devServer: {
    hot: true,
    open: true,
    port: port,
    client: {
      overlay: {
        warnings: true,
        errors: true,
      },
    },
  },
});
