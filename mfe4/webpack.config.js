const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const commonConfig = require('./webpack.common')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const packageJson = require('./package.json')

const devConfig = {
    mode: 'development',
    output: {
        publicPath: 'http://localhost:8085/'
    },
    devtool: 'inline-source-map',
    devServer: {
        port: 8085,
        historyApiFallback: {
            index: '/index.html'
        }
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'MFE3',
            filename: 'remoteEntry.js',
            exposes: {
                'VueFeature': './src/bootstrap'
            },
            shared: packageJson.dependencies
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ]
}

module.exports = merge(commonConfig, devConfig)
