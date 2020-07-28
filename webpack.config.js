module.exports = {
    mode: "development",
    entry: {
        main: "./main.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],//es 高级转低级
                        plugins: [
                            ["@babel/plugin-transform-react-jsx",
                                { pragma: "ToyReact.createElement" }
                            ]]
                    }
                },
            }
        ]
    },
    // optimizations: {
    //     minimize: false
    // }
}