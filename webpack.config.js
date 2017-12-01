var ExtractTextPlugin = require('extract-text-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var Webpack = require('webpack')

module.exports = {
  entry: {
    app: [
      './assets/index.js'
    ]
  },

  output: {
    path: require('path').resolve(__dirname, 'static'),
    filename: 'scripts/docs.js',
    publicPath: '/'
  },

  devtool: 'source-map',

  resolve: {
    extensions: [
      '.js'
    ]
  },

  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: [
          "babel-loader"
        ]
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'less-loader'
          ]
        })
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]',
          mimetype: 'application/font-woff'
        }
      },
      {
        test: /\.otf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]',
          mimetype: 'application/x-font-opentype'
        }
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]',
          mimetype: 'image/svg+xml'
        }
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]',
          mimetype: 'application/octet-stream'
        }
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]',
          mimetype: 'application/vnd.ms-fontobject'
        }
      }
    ]
  },

  plugins: [
    new Webpack.ProvidePlugin({
      'jQuery': 'jquery',
      '$': 'jquery',
      'Tether': 'tether'
    }),
    new ExtractTextPlugin({
      filename: 'styles/docs.css'
    }),
    new CopyWebpackPlugin([{
      from: 'assets/images',
      to: 'images'
    }]),
    new Webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(
        process.env.NODE_ENV || 'development'
      )
    })
  ]
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'

  module.exports.plugins = (module.exports.plugins || []).concat([
    new Webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      minimize: true,
      output: {
        semicolons: false
      }
    })
  ])
}
