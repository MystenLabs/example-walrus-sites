const path = require("path");

module.exports = {
    watch: true,
    entry: {
        index: "./src/index.ts",
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                type: "asset/source",
            },
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "./dist/"),
        clean: true,
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
};
