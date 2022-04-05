"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var config = {
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
exports.default = config;
