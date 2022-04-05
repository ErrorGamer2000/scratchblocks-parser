import { Configuration } from "webpack";
import * as path from "path";

const config: Configuration = {
  mode: "production",
  entry: "parser.ts",
  resolve: {
    extensions: ["js", "ts"]
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "scratchblocks-parser.js",
    library: "scratchblocksParser"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  }
};

export default config;
