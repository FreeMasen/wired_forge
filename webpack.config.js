const webpack = require('webpack');

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
                }
            ]
        }
}