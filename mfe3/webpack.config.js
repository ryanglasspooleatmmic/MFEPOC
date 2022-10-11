const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const commonConfig = require('./webpack.common')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const packageJson = require('./package.json')

const devConfig = {
    mode: 'development',
    output: {
        publicPath: 'http://localhost:8084/'
    },
    devServer: {
        port: 8084,
        historyApiFallback: {
            index: '/index.html'
        }
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'MFE3',
            filename: 'remoteEntry.js',
            exposes: {
                'VueFeature': './src/bootstrap',
                'VueFeatureApp': './src/App',
            },
            shared: packageJson.dependencies
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ]
}

module.exports = merge(commonConfig, devConfig)
