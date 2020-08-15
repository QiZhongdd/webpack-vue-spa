const webpack = require('webpack');
const { resolve } = require('path');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const argv = require('yargs-parser')(process.argv.slice(2));
const _mode = argv.mode || 'development';
const isDev = _mode === 'development';
const mergeConfig = require(`./build/webpack.${_mode}.js`);

const smp = new SpeedMeasurePlugin();
const baseConfig = {
    entry: './src/app.js',
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: [
                    'cache-loader',
                    {
                        loader: 'thread-loader',
                        options: {
                            workers: 2,
                            workerParallelJobs: 50,
                            workerNodeArgs: ['--max-old-space-size=1024'],
                            poolRespawn: false,
                            poolTimeout: 2000,
                            poolParallelJobs: 50,
                            name: 'vue-pool'
                        }
                    },
                    'vue-loader?cacheDirectory=true'
                ]
            },
            {
                test: /\.(postcss|css)$/,
                use: [
                    'cache-loader',
                    {
                        loader: 'thread-loader',
                        options: {
                            workers: 3,
                            workerParallelJobs: 50,
                            workerNodeArgs: ['--max-old-space-size=1024'],
                            poolRespawn: false,
                            poolTimeout: 2000,
                            poolParallelJobs: 50,
                            name: 'css-pool'
                        }
                    },
                    'vue-style-loader',
                    { loader: MiniCssExtractPlugin.loader },
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    'postcss-loader?cacheDirectory=true'
                ]
            },
            {
                test: /\.(woff2?|eot|ttf|otf|pdf|png|jpeg|jpg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 102400,
                            esModule: false, // 这里设置为false
                            name: '[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        alias: {
            vue$: 'vue/dist/vue.esm.js',
            '@': resolve(__dirname, 'src')
        }
    },
    optimization: {
        runtimeChunk: {
            name: 'runtime'
        },
        splitChunks: {
            chunks: 'async',
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name: false,
            cacheGroups: {
                commons: {
                    chunks: 'initial',
                    minChunks: 2,
                    maxInitialRequests: 5,
                    minSize: 0,
                    name: 'commons'
                }
            }
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new ProgressBarPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html', // 模板路径
            filename: 'index.html', // 自动生成的HTML文件的名称
            minify: {
                html5: true,
                minifyJS: true,
                removeComments: true
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(_mode)
            }
        }),
        new MiniCssExtractPlugin({
            filename: isDev
                ? 'styles/[name].css'
                : 'styles/[name].[contenthash:5].css',
            chunkFilename: isDev
                ? 'styles/[name].css'
                : 'styles/[name].[contenthash:5].css',
            ignoreOrder: false
        }),
        new VueLoaderPlugin()
    ]
};

module.exports = smp.wrap(merge(baseConfig, mergeConfig));
