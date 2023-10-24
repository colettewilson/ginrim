const { merge } = require("webpack-merge")
const path = require("path")
const base = require("./webpack.base.js")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const { WebpackManifestPlugin } = require("webpack-manifest-plugin")

const prodConfig = {
  mode: "production",
  target: "web",
  output: {
    path: path.resolve(__dirname, "./web/dist"),
    filename: "[name].[contenthash].js"
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css"
    }),
    new WebpackManifestPlugin({
      publicPath: '',
      writeToFileEmit: true
    }),
  ]
}

module.exports = merge(base, prodConfig)