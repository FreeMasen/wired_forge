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
                },
                {
                    test: /\.scss$/,
                    use: [{
                        loader: "style-loader", options: {
                            sourceMap: true
                        } // creates style nodes from JS strings
                    }, {
                        loader: "css-loader", options: {
                            sourceMap: true
                        } // translates CSS into CommonJS
                    }, {
                        loader: "sass-loader", options: {
                            sourceMap: true
                        } // compiles Sass to CSS
                    }]
                }
            ]
        }
}