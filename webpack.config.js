const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");


const baseConfig = {
  context: path.resolve(__dirname, 'src'),
    entry: {
        main: [path.resolve(__dirname, './src/index.ts')],
    }, 
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.[tj]s$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
              test: /\.(svg|png|jpg|jpeg|gif)$/i,
              type: 'asset/resource',
              generator: {
                filename: '[path][name][ext][query]'
              }
            },
            {
              test: /\.html$/i,
              loader: 'html-loader'
            },
            {
              test: /\.(woff|woff2|eot|ttf|otf)$/i,
              type: 'asset/resource',
              generator: {
                filename: 'assets/fonts/[name][ext][query]'
              }
            },
            {
              test: /(\.ico)$/i,
              type: 'asset/resource',
              generator: {
                filename: 'assets/favicon/[name][ext][query]'
              }
            },
            {
              test: /\.(webmanifest|manifest)$/i,
              type: 'asset/resource',
              generator: {
                filename: 'assets/favicon/[name][ext][query]'
              }
            }
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: 'assets/[name][ext][query]',
        clean: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html',
            chunks: ['main']
        }),
        new MiniCssExtractPlugin({
            filename: 'style.css'
          }),
        new CopyPlugin({
          patterns: [
            {
              to({ context, absoluteFilename }) {
                return `assets/${path.relative(context, absoluteFilename)}`;
              },
              from: "assets",
            },
          ],
        }),
    ]
    
};

module.exports = ({ mode }) => {
    const isProductionMode = mode === 'prod';
    const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');

    return merge(baseConfig, envConfig);
};
