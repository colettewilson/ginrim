const webpack = require("webpack")
const { merge } = require("webpack-merge")
const base = require("./webpack.base.js")
const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const StyleLintPlugin = require("stylelint-webpack-plugin")

const devConfig = {
  mode: "development",
  target: "web",
  devtool: "source-map",
  stats: "normal",
  infrastructureLogging: {
    colors: true,
    level: "verbose",
  },
  devServer: {
    devMiddleware: { writeToDisk: true },
		hot: 'only',
		port: 8080,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Methods": "*",
    },
    watchFiles: [
      path.resolve(__dirname, 'public/dist'),
      path.resolve(__dirname, 'templates'),
    ],
    allowedHosts: [ "localhost:8080", 'ginrim.local'],
    static: [
      {
        directory: path.resolve(__dirname, 'templates'),
        serveIndex: false, 
        watch: true
      },
      {
        directory: path.resolve(__dirname, 'public/dist'),
        serveIndex: false,
        watch: true,
      },
    ],
    client: {
      overlay: true,
    },
    proxy: {
      '*': 'http://ginrim.local',
    }
  },
  watchOptions: {
    ignored: ["node_modules"],
  },
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: "[name].js",
    clean: true,
  },
  plugins: [
    new StyleLintPlugin({
      configFile: path.resolve(__dirname, ".stylelintrc.js"),
      files: ["assets/scss/app.scss"],
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css"
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
}

module.exports = merge(base, devConfig)