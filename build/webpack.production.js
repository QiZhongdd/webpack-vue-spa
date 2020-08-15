const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const WebpackDeepScopePlugin = require('webpack-deep-scope-plugin').default;
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
module.exports = {
    mode: 'production',
    output: {
        filename: 'scripts/[name].[hash:5].bundle.js',
        publicPath: '/'
    },
    plugins: [
        new WebpackDeepScopePlugin(),
        new HardSourceWebpackPlugin(),
        new OptimizeCSSAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                preset: ['default', { discardComments: { removeAll: true } }]
            },
            canPrint: true
        })
    ],
    optimization: {
        minimizer: [new TerserJSPlugin({
            cache: true, // 是否缓存
            parallel: true, // 是否并⾏打包
            sourceMap: true
        })]
    }
};
