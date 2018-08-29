import path from 'path';
import WriteFilePlugin from 'write-file-webpack-plugin';

export default {
    mode: 'development',
    entry: [
        path.join(__dirname, '/client/index.js'),
        path.join(__dirname, '/client/scss/app.scss')
    ],
    output: {
        path: path.join(__dirname, '/public/js/'),
        publicPath: path.join(__dirname, '/public/js/'),
        filename: 'bundle.js'
    },
    plugins: [
        new WriteFilePlugin()
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.join(__dirname, 'client'),
                exclude: path.join(__dirname, 'node_modules'),
                loaders: ['babel-loader']
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].css',
                            outputPath: path.join(__dirname, '/public/css/')
                        }
                    },
                    {
                        loader: 'extract-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.scss']
    }
}