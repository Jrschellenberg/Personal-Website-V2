const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const autoprefixer = require('autoprefixer');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


const isDebug = process.env.NODE_ENV !== 'production';
const mode = `${isDebug ? 'development' : 'production'}`;


module.exports = {
  mode: mode,
  entry: {
    main: './src/js/app.js',
  },
  optimization: {
    minimizer: [
      ...(isDebug
        ? []
        : [
            // Minimize all JavaScript output of chunks
            // https://webpack.js.org/plugins/uglifyjs-webpack-plugin/
            new TerserPlugin({
              cache: true,
              parallel: true,
              sourceMap: true, // set to true if you want JS source maps
            }),
          ]),

      ...(isDebug
        ? []
        : [
            // Minimize all Css output of chunks
            // https://github.com/NMFR/optimize-css-assets-webpack-plugin
            new OptimizeCSSAssetsPlugin({}),
          ]),
    ],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(scss)$/,
        include: [path.resolve(__dirname, 'src/sass')],
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].bundle.css',
              context: './',
              outputPath: '/stylesheets',
              publicPath: './',
            },
          },
          {
            loader: 'extract-loader',
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: isDebug,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: isDebug,
              plugins: () => [
                autoprefixer,
              ],
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDebug,
            },
          },
        ],
      },
      {
        test: /\.(css|scss)$/,
        exclude: [path.resolve(__dirname, 'src/sass')],
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: isDebug,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: isDebug,
              plugins: () => [
                autoprefixer,
              ],
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDebug,
            },
          },
        ],
      },
      {
        test: /\.(jpg|jpeg|gif|png|svg|woff|woff2|otf)$/,
        // File loader
        // https://github.com/webpack-contrib/file-loader
        loader: 'file-loader',
        options: {
          emitFile: false,
          name: '[path][name].[ext]',
          outputPath: url => {
            // This function modifies [path] in the name above.
            const strParts = url.split('src/site/');
            if (!strParts[1]) {
              // Someone has changed the folder structure and is going to cause webpack to fail. So force it to stop!
              throw new Error('Webpack failed to build b/c folder structure has since changed!!');
            }
            return `/${strParts[1]}`;
          },
        },
      },
    ],
  },
  plugins: [
    //new BundleAnalyzerPlugin(), // Uncomment this to view Bundles Visual Weights
    new Dotenv({
      path: './.env', // load this now instead of the ones in '.env'
      safe: false, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
      systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
      silent: false, // hide any errors
      defaults: false, // load '.env.defaults' as the default values if empty.
    }),
    new CopyPlugin([
      {
        context: 'src/site/images/',
        from: '**/*',
        to: 'images/[path][name].[ext]',
        toType: 'template',
      },
    ]),
    new CopyPlugin([
      {
        context: 'src/site/uploads/',
        from: '**/*',
        to: 'uploads/[path][name].[ext]',
        toType: 'template',
      },
    ]),
    new MiniCssExtractPlugin({
      filename: 'stylesheets/[name].bundle.css',
    }),
  ],
  devtool: isDebug ? 'inline-source-map' : false,
  // Don't attempt to continue if there are any errors.
  // https://webpack.js.org/configuration/other-options/#bail
  bail: !isDebug,
  // Cache the generated webpack modules and chunks to improve build speed
  // https://webpack.js.org/configuration/other-options/#cache
  cache: isDebug,
  // Precise control of what bundle information gets displayed
  // https://webpack.js.org/configuration/stats/
  stats: 'normal',
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.scss'],
    alias: {

      '@Helpers': path.resolve(__dirname, 'src/js/helpers'),
      '@Utilities': path.resolve(__dirname, 'src/js/utils.js'),
      '@Config': path.resolve(__dirname, 'src/js/config.js'),
      '@Services': path.resolve(__dirname, 'src/js/services/'),
      '@Schemas': path.resolve(__dirname, 'src/js/schemas/'),
    },
  },
  output: {
    filename: 'js/[name].bundle.js',
    path: path.resolve(__dirname, 'serve'),
  },
  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  // https://webpack.github.io/docs/configuration.html#node
  // https://github.com/webpack/node-libs-browser/tree/master/mock
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
};
