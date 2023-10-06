// webpack.config.js
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const path = require('path');
const outputPath = 'dist';
const entryPoints = {
    index: [
        path.resolve(__dirname, 'src', 'index.ts'),
    ],
    background: path.resolve(__dirname, 'src', 'background.ts')
};

module.exports = {
    entry: entryPoints,
    output: {
        path: path.join(__dirname, outputPath),
        filename: '[name].js',
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(jpg|jpeg|png|gif|woff|woff2|eot|ttf|svg)$/i,
                use: 'url-loader?limit=1024'
            }
        ],
    },
    plugins: [
        new CopyPlugin({
            patterns: [{ from: '.', to: '.', context: 'public' }]
        }),
        new Dotenv(),
    ]
};