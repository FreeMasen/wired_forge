const webpack = require('webpack');
const ugly = require('uglifyjs-webpack-plugin')
module.exports = {
        devtool: 'source-map',
        entry: {
            app: './target/doc/ts/app.ts'
        },
        output: {
            path: __dirname + '/target/doc/js/build/',
            filename: '[name].js',
        },
        resolve: {
            extensions: ['.ts', '.js']
        },
        module: {
            loaders: [
                {
                    test: /\.ts$/,
                    exclude: ['node_modules'],
                    use: ['awesome-typescript-loader']
                },
                {
                    test: /\.js$/,
                    use: 'uglify-loader'
                }
            ]
        },
        plugins: [
            // new ugly({
            //     sourceMap: true,
            //     extractComments: true
            // })
        ]
}