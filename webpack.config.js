const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // Import the plugin for CSS extraction
const path = require("path");

module.exports = (env, argv) => {
  const isDevelopment = argv.mode === "development";

  return {
    mode: argv.mode || "development", // Use the mode from npm scripts or default to development
    entry: "./src/app.js", // Entry point remains the same
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js",
      publicPath: "/MilitzaVazquez-AboutMe/", // This may need to be adjusted if you deploy to a subdirectory
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
        {
          test: /\.css$/,
          use: [
            isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
            "css-loader",
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        filename: "index.html",
      }),
      new MiniCssExtractPlugin({
        filename: "styles.[contenthash].css", // Using contenthash for cache busting
      }),
    ],
    devServer: {
      static: {
        directory: path.join(__dirname, "dist"),
      },
      compress: true,
      port: 3001,
      open: true,
      hot: true,
    },
    devtool: isDevelopment ? "eval-source-map" : "source-map", // Different source maps for dev and prod
  };
};
