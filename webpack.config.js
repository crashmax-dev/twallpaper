const path = require('path')
const { BannerPlugin } = require('webpack')
const CopyPlugin = require('copy-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const RemovePlugin = require('remove-files-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

const { name, version, description, homepage } = require('./package.json')
const banner = `${name}@${version} (${homepage})\n${description}`

module.exports = (env, args) => ({
  entry: {
    index: './src/demo/index.ts',
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
            loader: 'babel-loader'
          },
          // {
          //   loader: 'ts-loader'
          // }
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
      new CssMinimizerPlugin(),
      new TerserPlugin({
        extractComments: false
      })
    ]
  },
  plugins: [
    new BannerPlugin(banner),
    new RemovePlugin({
      before: {
        include: [
          'dist'
        ]
      },
      // after: {
      //   include: [
      //     'dist/demo'
      //   ]
      // }
    }),
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
