const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const webpack = require('webpack');
const fsFile = require('fs');


/**
 * Returns a common configuration object based on the provided environment and arguments.
 *
 * @param {string} enviroment - the environment for which the configuration is being generated
 * @param {Record<string, any>} args - additional arguments for configuration
 * @return {object} the common configuration object
 */
function getCommonConfig(enviroment: string, args: Record<string, any>) {

    return {
        mode: enviroment,
        entry: './src/index.tsx',
        output: {
            path: path.resolve(args.dirname, '../../../dist/dist_' + enviroment),
            filename: 'bundles/[name].[fullhash].bundle.js',
            chunkFilename: 'bundles/[name].chunk.js',
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx'],
            modules: [path.resolve('node_modules'), 'node_modules'],
            alias: {
                "src": path.resolve(args.dirname, '../../../src'),
                "@app": path.resolve(args.dirname, '../../../src')
            },
        },
        module: {
            rules: [
                {
                    test: /\.(png|jpg|jpeg|gif|svg)$/,
                    type: 'asset/resource',
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        enviroment === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
                        'css-loader',    // Translates CSS into CommonJS
                        'sass-loader'    // Compiles Sass to CSS
                    ],
                },
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react'],
                            plugins: [
                                '@babel/plugin-proposal-class-properties',
                                '@babel/plugin-syntax-dynamic-import',
                                "react-hot-loader/babel",
                                enviroment === 'development' ? require.resolve('react-refresh/babel') : "",
                            ].filter(Boolean)
                        }
                    },
                },
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
            ],
        }
    }
}

/**
 * Returns an array of common plugins based on the environment and arguments.
 *
 * @param {string} enviroment - the environment string
 * @param {Record<string, any>} args - the arguments object
 * @return {Array} an array of common plugins
 */
function getCommonPlugins(enviroment: string, args: Record<string, any>) {

    let packageJson = JSON.parse(fsFile.readFileSync(path.resolve(args.dirname, '../../../package.json'), 'utf-8'));
    let dotEnvFile;

    if (args.dotEnvFile)
        dotEnvFile = "../../../config/env/" + args.dotEnvFile;
    else
        dotEnvFile = enviroment === 'production' ? '../../../config/env/.env.production' : '../../../config/env/.env.development';

    return [
        new Dotenv({
            path: path.resolve(args.dirname, dotEnvFile), // Specify the path to your .env file
        }),
        new HtmlWebpackPlugin({
            title: args.htmlTitle,
            template: path.resolve(__dirname, "../../../public/indexWebpack.html"),
            filename: "./index.html"
        }),
        new webpack.DefinePlugin({
            'process.env.APP_VERSION': JSON.stringify(packageJson.version),
        }),
        enviroment === 'development' ? new ReactRefreshWebpackPlugin() : "",
    ].filter(Boolean)
}

/**
 * Execute common configuration for the given environment and arguments.
 *
 * @param {string} enviroment - the environment for configuration
 * @param {Record<string, any>} args - the arguments for configuration
 * @return {object} the merged common configuration
 */
function executeCommonConfig(enviroment: string, args: Record<string, any>) {

    return {
        ...getCommonConfig(enviroment, args),
        plugins: [
            new MiniCssExtractPlugin({
                filename: `styles/[name].[fullhash].css`,
                chunkFilename: 'styles/[name].[fullhash].chunk.js',
            }),
            ...getCommonPlugins(enviroment, args),
            new CleanWebpackPlugin(),
        ],
        optimization: {
            minimize: true,
            usedExports: true, //removes unused files
            concatenateModules: true,
            splitChunks: {
                chunks: 'all',
                minSize: 20000,
                maxSize: 70000,
                minChunks: 1,
                maxAsyncRequests: 30,
                maxInitialRequests: 30,
                automaticNameDelimiter: '~',
                cacheGroups: {
                  vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                  },
                  default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                  }
                }
              },
            minimizer: [
                new CssMinimizerPlugin(),
                new TerserPlugin({
                    terserOptions: {
                        compress: {
                            //drop_console: enviroment === 'production' ? true : false,
                            pure_funcs: enviroment === 'production' ? ['console.log'] : []
                        },
                    },
                }),
                new ScriptExtHtmlWebpackPlugin({ custom: { test: /\.js$/, attribute: 'charset', value: 'UTF-8' } }),
                new BundleAnalyzerPlugin({
                    analyzerMode: 'static',
                    openAnalyzer: false,
                    reportFilename: path.resolve(args.dirname, '../../../dist/report_' + enviroment + '.html'),
                }),
            ],
        }
    }
}

/**
 * Executes common server configuration based on the environment and arguments.
 *
 * @param {string} enviroment - the environment for which the configuration is executed
 * @param {Record<string, any>} args - the arguments for the configuration
 * @return {object} the merged common configuration with plugins
 */
function executeCommonServerConfig(enviroment: string, args: Record<string, any>) {

    return {
        ...getCommonConfig(enviroment, args),
        plugins: [
            ...getCommonPlugins(enviroment, args),
        ],
    }
}

module.exports = {
    executeCommonConfig: executeCommonConfig.bind(this),
    executeCommonServerConfig: executeCommonServerConfig.bind(this)
};