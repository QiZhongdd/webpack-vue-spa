const TerserJSPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const webpackDeepScopePlugin = require('webpack-deep-scope-plugin').default

module.exports = {
  mode: "production",
  output: {
    filename: "scripts/[name].[hash:5].bundle.js",
    publicPath: "/",
  },
  plugins: [
    new webpackDeepScopePlugin(),
  ],
  optimization: {
    minimizer: [new TerserJSPlugin({
     cache: true, // 是否缓存
     parallel: true, // 是否并⾏打包
     sourceMap: true
    }), new OptimizeCSSAssetsPlugin({})],
  },
};
