const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const { WebpackManifestPlugin } = require("webpack-manifest-plugin")
const globImporter = require("node-sass-glob-importer")
const SVGSpritemapPlugin = require("svg-spritemap-webpack-plugin")

module.exports = {
  entry: {
    app: [
      "./src/javascripts/app.js",
      "./src/sass/app.scss"
    ],
  },
  output: {
    path: path.resolve(__dirname, 'web/dist'),
    publicPath: "/",
    filename: '[name].js',
    chunkFilename: '[name].js',
    library: "craft3",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }, {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        use:  [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            }
          },
          'postcss-loader',
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                importer: globImporter()
              }
            },
          },
        ]
      }, {
        test: /\.(png|jpg|gif)$/,
        exclude: /node_modules/,
        use: [
          "file-loader"
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin({ 
      cleanAfterEveryBuildPatterns: ['web/dist/*'],
    }),
    new SVGSpritemapPlugin(path.resolve(__dirname, "./src/sprites/**/*.svg"), {
      output: {
        filename: "sprite.svg",
        svg4everybody: true,
        svgo: true
      },
      sprite: {
        prefix: "",
        generate: {
          title: false,
          symbol: true,
          use: true,
        },
      },
      styles: "./src/sprites/tmpl.scss",
    }),
    new WebpackManifestPlugin(),
  ],
}