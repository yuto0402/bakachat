const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const isProduction = process.env.NODE_ENV == 'production';

const config = {
  entry: './src/index.jsx',
  output:{
    // バンドルしたファイルの出力先を設定する
    clean: true,
    path: path.join(__dirname, './dist'),
    chunkFilename: 'static/js/[contenthash].chunk.js',
    filename: 'static/js/[contenthash].bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
        {
           test: /\.(js|jsx)$/,
           exclude: ['/node_modules/'],
           use: {
               loader: 'babel-loader',
               options: {
                presets: ['@babel/preset-env', '@babel/preset-react'],
                sourceType: 'module',
               }
           }
        },
        {
            test: /\.(scss|sass|css)$/i,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        },
        {
            test: /\.(png|jpg|gif|svg)/,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        name: path.resolve(__dirname, 'src/images/[name].[ext]') //[name]は画像名、[ext]は拡張子
                    }
                }
            ]
        },
        {
            test: /\.(eot|ttf|woff|woff2)$/i,
            type: 'asset',
        },
        // Add your rules for custom modules here
        // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
  devServer:{
    static: {
        directory: path.join(__dirname, 'public'),
    },
    server: 'http',
    host: 'localhost',
    port: '3000',
    open: ['/bakachat'], // true:サーバを起動したとき自動でブラウザを起動する
    liveReload: true, // true:ファイルの変更を検知して自動でブラウザをリロードする
    watchFiles: ['src/**/*'], // ファイルの変更を検知して自動でブラウザをリロードする
    historyApiFallback: true, // true:ブラウザのリロードを行わない
    compress: true, // true:gzip圧縮を有効にする
    client:{
        logging: 'info',
        progress: true,
        overlay: true
    }
  },
  resolve:{
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  target: 'web',
  plugins: [
    new HtmlWebpackPlugin({
        template: path.join(__dirname, 'public', 'index.html'),
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
        chunkFilename: 'static/css/[contenthash].css',
        filename: 'static/css/[contenthash].css',
    }),
    new CopyWebpackPlugin({
        patterns: [
            { from: 'src/images', to: 'static/img' },
        ]
    }),
    new Dotenv(),
     // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
    } else {
        config.mode = 'development';
    }
    return config;
}
