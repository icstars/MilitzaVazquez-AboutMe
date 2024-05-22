const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // Import the plugin

module.exports = {
  mode: "development", // This can be overridden by the --mode option in npm scripts
  entry: "./docs/app.js", // Make sure this path points to your main JS file
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/MilitzaVazquez-AboutMe/", // Replace `<repository-name>` with your GitHub repo name
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
        use: [MiniCssExtractPlugin.loader, "css-loader"], // Use MiniCssExtractPlugin for CSS
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./docs/index.html", // Ensure this points to your HTML template
    }),
    new MiniCssExtractPlugin({
      // Add the plugin to extract CSS into separate files
      filename: "styles.css",
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "docs"),
    },
    compress: true,
    port: 3001,
    open: true,
    hot: true,
  },
};
