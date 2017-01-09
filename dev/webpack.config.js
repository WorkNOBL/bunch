var Env = process.env.NODE_ENV
var Package = require('./package.json')
var Path = require('path')
var Webpack = require('webpack')
var Merge = require('webpack-merge')
var LiveReloadPlugin = require('webpack-livereload-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var Bourbon = require('node-bourbon')
var Paths = {
    Core: Path.join(__dirname, 'core'),
    Public: Path.join(Path.resolve('..'), 'public', 'assets')
}

var SASS = Bourbon.includePaths.concat([
    Path.join(Paths.Core, 'Style', 'Vendor'),
    Path.join(__dirname, 'node_modules', 'normalize.css')
]).map(function(path){
    return `includePaths[]=${path}`
}).join('&')

var Common = {
    context: Paths.Core,
    entry: './Vendor/Initialize.es6',
    resolve: {
        extensions: ['', '.js', '.jsx', '.es6', '.scss'],
        modulesDirectories: ['node_modules']
    },
    output: {
        path: Paths.Public
    },
    module: {
        loaders: [{
            test: /\.es6$/,
            loader: 'babel',
            exclude: /node_modules/,
            root: [Paths.Core]
        }, {
            test: /\.(scss|css)$/,
            loader: ExtractTextPlugin.extract(
                'style',
                'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass?' + SASS
            )
        }, {
            test: /\.(png|jpg|woff|ttf|eot|svg)$/,
            loader: 'url-loader?limit=8192'
        }]
    }
}

if (Env === 'development') {
    module.exports = Merge(Common, {
        output: {
            filename: 'application.js'
        },
        watch: true,
        devtool: 'eval-source-map',
        plugins: [
            new ExtractTextPlugin('application.css', {
                allChunks: true
            }),
            new Webpack.NoErrorsPlugin(),
            new Webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('development')
            }),
            new LiveReloadPlugin({
                appendScriptTag: true
            })
        ]
    })
}

if (Env === 'production'){
    module.exports = Merge(Common, {
        output: {
            filename: 'application.js'
        },
        plugins: [
            new ExtractTextPlugin('application.css', {
                allChunks: true
            }),
            new Webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('production')
            }),
            new Webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            })
        ]
    })
}