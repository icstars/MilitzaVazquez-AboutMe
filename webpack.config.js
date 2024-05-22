const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development", // This can be overridden by the --mode option in npm scripts
  entry: "./src/app.js", // Make sure this path points to your main JS file
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
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
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html", // Ensure this points to your HTML template
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "src"),
    },
    compress: true,
    port: 3001,
    open: true,
    hot: true,
  },
};
