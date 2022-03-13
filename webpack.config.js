const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = (env, args) => ({
  entry: {
    demo: './src/demo/index.ts',
    twallpaper: './src/twallpaper.ts'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    libraryTarget: 'umd',
    globalObject: 'this',
    umdNamedDefine: true
  },
  devtool: args.mode === 'development' ? 'source-map' : false,
  devServer: {
    port: 3000,
    open: true,
    compress: true,
    devMiddleware: {
      writeToDisk: true
    },
    static: {
      directory: path.resolve(__dirname, 'public')
    }
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: {
                      esmodules: true
                    }
                  }
                ]
              ]
            }
          },
          {
            loader: 'ts-loader'
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [
      '.ts',
      '.js'
    ]
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false
      })
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'public'),
          to: path.resolve(__dirname, 'dist'),
          noErrorOnMissing: true,
          globOptions: {
            ignore: [
              '*.DS_Store',
              '**/*.js'
            ]
          }
        }
      ]
    })
  ]
})
