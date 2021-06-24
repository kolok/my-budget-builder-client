const webpack = require('webpack')
// Simplifies creation of HTML files to serve your webpack bundles
const CopyWebpackPlugin = require("copy-webpack-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const path = require('path')

module.exports = function(env) {
  var CONFIG = {
    entry: ['babel-polyfill', './src/main.js'],
    output: {
      /*global __dirname*/
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[hash].js',
    },
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            'style-loader',
            // Translates CSS into CommonJS
            'css-loader',
            // Compiles Sass to CSS
            'sass-loader',
          ],
        },
        {
          test: /\.js$/, exclude: /node_modules/,
          use: 'babel-loader'
        },
        {
          test: /\.vue$/,
          use: 'vue-loader'
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
          use: 'file-loader'
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Caching',
        template: './index.html'
      }),
      new VueLoaderPlugin(),
      new webpack.HashedModuleIdsPlugin(), // so that file hashes don't change unexpectedly
      new CopyWebpackPlugin([{ 
        from: "./static", 
          to: "static"
      }]),
    ],
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 0,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              // get the name. E.g. node_modules/packageName/not/this/part.js
              // or node_modules/packageName
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

              // npm package names are URL-safe, but some servers don't like @ symbols
              return `npm.${packageName.replace('@', '')}`;
            }
          }
        }
      }
    }
  }

  if (env.NODE_ENV == 'development') {
    console.log('=== In the development mode ===')
    CONFIG.mode = 'development'
    CONFIG.plugins.push(new webpack.HotModuleReplacementPlugin())
    CONFIG.plugins.push(new webpack.DefinePlugin({
      'process.env.API_URL': JSON.stringify(env.API_URL)
    }))
    CONFIG.devServer = {
      // contentBase: '', # Confuse
      hot: true,
      disableHostCheck: true,
      historyApiFallback: true,
      noInfo: true,
      overlay: true
    }
  }
  if (env.NODE_ENV == 'production') {
    console.log('=== In the production mode ===')
    CONFIG.mode = 'production'
    // Turn on Production Mode
    CONFIG.plugins.push(new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }))
  }


  return CONFIG
}
