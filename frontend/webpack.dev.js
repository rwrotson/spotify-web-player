const webpack = require("webpack")
const { merge } = require("webpack-merge")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const common = require("./webpack.common.js")

const devServer = {
  open: false,
  allowedHosts: ["all"],
  host: "0.0.0.0",
  port: 3000,
}

module.exports = merge(common, {
  mode: "development",
  entry: ["./src/index.tsx"],
  devServer: devServer,
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({ template: "./public/index.html" }),
  ],
})
