var path = require("path");

const include = path.join(__dirname, "src");

module.exports = {
    entry: "./src/index",
    output: {
        path: path.join(__dirname, "dist"),
        libraryTarget: "umd",
        filename: "motion-sensitive.min.js"
    },
    mode: "production",
    target: "web",
    plugins: [],
    resolve: {
        extensions: [".js"]
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                },
                include
            }
        ]
    }
};
