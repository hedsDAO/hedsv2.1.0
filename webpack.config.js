let path = require("path");
require("dotenv").config();
var NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
let HtmlWebpackPlugin = require("html-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const ENV = process.env.NODE_ENV || "development";
module.exports = {
  entry: "./client/src/index.js",
  output: {
    publicPath: "/",
    path: path.resolve(__dirname, "builds/app"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(jpg|glb|m4a|mp3|jpeg|wav|webp|png|ttf|ogg|otf|gif|svg|mp4|mov)$/,
        type: 'asset/resource'
      },
      { test: /.txt$/, use: "raw-loader" },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
    ],
  },
  mode: ENV,
  devServer: {
    host: "localhost",
    hot: true,
    port: 8090,
    headers: { "Access-Control-Allow-Origin": "*" },
    historyApiFallback: true,
    inline: true,
    proxy: {
      "/api": {
        target: "http://localhost:8081",
        secure: false,
        changeOrigin: true,
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "client/src/index.html",
      favicon: "./public/heds_icon_sm.png",
    }),
    new CompressionPlugin({
      test: /\.js(\?.*)?$/i,
    }),
    new NodePolyfillPlugin(),
    // { @testing }
    // new BundleAnalyzerPlugin()
  ],
  resolve: {
    extensions: [".js", ".jsx", ".tsx", ".ts"]
  },
};
