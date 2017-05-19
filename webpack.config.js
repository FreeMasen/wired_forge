const webpack = require('webpack');

module.exports = {
        devtool: 'eval-cheap-module-source-map',
        entry: {
            app: './target/doc/ts/app.ts'
        },
        output: {
            path: __dirname + '/target/doc/js/build/',
            filename: '[name].js',
            sourceMapFilename: '[name].js.map'
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