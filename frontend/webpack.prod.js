const path = require("path")
const { merge } = require("webpack-merge")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const common = require("./webpack.common.js")

module.exports = merge(common, {
  mode: "production",
  entry: ["./src/index.tsx"],
  plugins: [new HtmlWebpackPlugin({ template: "./public/index.html" })],
})
