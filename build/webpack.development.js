const webpack = require('webpack');
const path = require('path');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
module.exports = {
    mode: 'development',
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/',
        filename: 'scripts/[name].bundle.js'
    },
    devServer: {
        contentBase: path.resolve(__dirname, '../dist'),
        disableHostCheck: true,
        quiet: true,
        open: true
    },
    plugins: [
        new webpack.SourceMapDevToolPlugin(), // sourcemap
        new FriendlyErrorsWebpackPlugin({
            compilationSuccessInfo: {
                messages: ['You application is running here http://localhost:3000'],
                notes: [
                    'Some additionnal notes to be displayed unpon successful compilation'
                ]
            },
            onErrors: function (severity, errors) {
                // 安装node-notifier 只想提示错误的话
            },
            quiet: true,
            clearConsole: true
        })
    ]
};
