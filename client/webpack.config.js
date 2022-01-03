const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");  
const glob = require('glob')
const PurgeCSSPlugin = require('purgecss-webpack-plugin')
const webpack = require('webpack');

const SRC_PATH = path.resolve(__dirname, './src');
const PUBLIC_PATH = path.resolve(__dirname, '../public');
const UPLOAD_PATH = path.resolve(__dirname, '../upload');
const DIST_PATH = path.resolve(__dirname, '../dist');

/** @type {import('webpack').Configuration} */
const config = {
  devServer: {
    // contentBase: [PUBLIC_PATH, UPLOAD_PATH],
    // http2: true,
    historyApiFallback: true,
    host: '0.0.0.0',
    port: 8080,
    proxy: {
      '/api': 'http://localhost:3000',
    },
    static: [PUBLIC_PATH, UPLOAD_PATH],
  },
  optimization: {
    // minimizer: process.env.NODE_ENV === 'production' ? [new UglifyJsPlugin()]: [],
    minimizer: 
    [
      new TerserPlugin({extractComments: 'all',terserOptions: {
        compress: {drop_console: process.env.NODE_ENV === 'production'
        }}}),
      // new UglifyJsPlugin()
      new OptimizeCSSAssetsPlugin({
        cssProcessorPluginOptions: {
          preset: ['advanced', 
                { 
                  autoprefixer: {
                    browsers: ["last 1 Chrome versions"]
                  },
                  // ライセンスも含めて、コメントを全て削除する
                  discardComments: { removeAll: true }, 
                  // CSSの定義のソートを行う    
                  cssDeclarationSorter : { order: 'smacss' }
            }
          ],
        },
        canPrint: true
      })
    ],
    minimize: process.env.NODE_ENV === 'production',
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

            // npm package names are URL-safe, but some servers don't like @ symbols
            return `npm.${packageName.replace('@', '')}`;
          },
        },
      },
    },
  },
  devtool: process.env.NODE_ENV === 'production' ? false : 'inline-source-map',
  entry: {
    main: [
      'regenerator-runtime/runtime',
      path.resolve(SRC_PATH, './index.css'),
      path.resolve(SRC_PATH, './buildinfo.js'),
      path.resolve(SRC_PATH, './index.jsx'),
      path.resolve(SRC_PATH, './styles/allinone.css')
    ],
  },
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.jsx?$/,
        use: [{ loader: 'babel-loader' }],
      },
      {
        test: /\.css$/i,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader', options: { url: false } },
          { loader: 'postcss-loader' },
        ],
      },
    ],
  },
  output: {
    filename: 'scripts/[name].[contenthash].js',
    path: DIST_PATH,
  },
  plugins: [
    new BundleAnalyzerPlugin(),
    new webpack.EnvironmentPlugin({
      BUILD_DATE: new Date().toISOString(),
      // Heroku では SOURCE_VERSION 環境変数から commit hash を参照できます
      COMMIT_HASH: process.env.SOURCE_VERSION || '',
      NODE_ENV: process.env.NODE_ENV ,
    }),
    new MiniCssExtractPlugin({
      filename: 'styles/[name].css',
    }),
    new PurgeCSSPlugin({
      paths: glob.sync(`${SRC_PATH}/**/*`,  { nodir: true }),
      extractors: [
        {
          extractor: (content) =>
            content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [],
          extensions: ["html", "js", "ts", "jsx"],
        },
      ],
    }),
    new HtmlWebpackPlugin({ 
      scriptLoading: 'defer', 
      chunks: ['main', 'npm', 'runtime'],
      publicPath: '/',
      template: path.resolve(SRC_PATH, './index.html'),
    }),
    new CompressionPlugin({
      test: /\.(css)|(js)$/,
      compressionOptions: {
        level: 9
      }
    }),
    new CleanWebpackPlugin(),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    fallback: {
      fs: false,
      path: false,
    },
  },
};

module.exports = config;
