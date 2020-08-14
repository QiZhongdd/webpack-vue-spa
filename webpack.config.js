const webpack = require('webpack')
const { resolve } = require('path')
const { merge } = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const argv = require('yargs-parser')(process.argv.slice(2))
const _mode = argv.mode || 'development'
const isDev = _mode === 'development'
const mergeConfig = require(`./build/webpack.${_mode}.js`)
// const threadLoader = require('thread-loader') // 开辟另一个线程加载loader，只适合较大的loader。
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const smp = new SpeedMeasurePlugin()
const baseConfig = {
  entry: './src/app.js',
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          'cache-loader',
          'vue-loader'
        ]
      },
      {
        test: /\.(vue|js)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        // 预处理
        enforce: 'pre'
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
              name: 'my-pool'
            }
          },
          'vue-style-loader',
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader'
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf|pdf|png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  },
  resolve: {
    // 不适于loader的解析
    modules: ['node_modules'],

    // 设置别名
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': resolve(__dirname, 'src')
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
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
      filename: isDev ? 'css/[name].css' : 'css/[name].[hash:5].css',
      chunkFilename: isDev ? 'css/[name].css' : 'css/[id].[hash:5].css'
    }),
    new VueLoaderPlugin()
  ]
}

module.exports = smp.wrap(merge(baseConfig, mergeConfig))
