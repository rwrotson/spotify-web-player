const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const Dotenv = require("dotenv-webpack")

const babelRule = {
  test: /\.(js|jsx|ts|tsx)$/,
  exclude: /node_modules/,
  use: {
    loader: "babel-loader",
    options: {
      presets: [
        "@babel/preset-env",
        ["@babel/preset-react", { runtime: "automatic" }],
        "@babel/preset-typescript",
      ],
      plugins: [
        "@babel/plugin-transform-runtime",
        "@babel/plugin-proposal-class-properties",
      ],
    },
  },
}

const javascriptRule = {
  test: /\.jsx?$/,
  loader: "babel-loader",
  exclude: /node_modules/,
}

const typescriptRule = {
  test: /\.(ts|tsx)$/,
  use: {
    loader: "ts-loader",
    options: {
      logLevel: "info",
      configFile: path.resolve(__dirname, "tsconfig.json"),
    },
  },
  exclude: /node_modules/,
}

const scssRule = {
  test: /\.scss$/,
  use: ["style-loader", "css-loader", "sass-loader"],
}

const cssRule = {
  test: /\.css$/,
  use: ["style-loader", "css-loader"],
}

const imageRule = {
  test: /\.(png|jpg|svg|gif)$/,
  use: ["file-loader"],
}

module.exports = {
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".css", ".svg"],
    alias: {
      assets: path.resolve(__dirname, "src/assets"),
      components: path.resolve(__dirname, "src/components"),
      state: path.resolve(__dirname, "src/state"),
      hooks: path.resolve(__dirname, "src/hooks"),
      utils: path.resolve(__dirname, "src/utils"),
      types: path.resolve(__dirname, "src/types"),
      styles: path.resolve(__dirname, "src/styles"),
    },
  },
  module: {
    rules: [
      babelRule,
      javascriptRule,
      typescriptRule,
      scssRule,
      cssRule,
      imageRule,
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html",
    }),
    new Dotenv({
      path: path.resolve(__dirname, "..", ".env"),
    }),
  ],
}
