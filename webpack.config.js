const path = require("path");

/**
 * @type { import("webpack").Configuration }
 */
module.exports = {
  mode: "production",
  entry: "./parser.ts",
  resolve: {
    extensions: [".js", ".ts"]
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "scratchblocks-parser.js",
    library: "scratchblocksParser"
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  }
};
