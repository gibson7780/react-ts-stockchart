const { merge } = require('webpack-merge');
const path = require('path');
const PROJECT_ROOT = path.resolve(__dirname, '../');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const common = require('./webpack.common');
module.exports = merge(common, {
  mode: 'production',
  entry: {
    app: [`${path.join(PROJECT_ROOT, 'src')}/index.tsx`],
  },
  output: {
    filename: 'js/[name].[hash].js',
  },
  devtool: 'source-map',
  plugins: [new CleanWebpackPlugin()],
});
