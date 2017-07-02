module.exports = {
    port: process.env.PORT,
    open: false,
    logLevel: "silent",
    server: {
        baseDir: "src",
        routes: {
        "/node_modules": "node_modules"
        },
        middleware: {
        "0": null
        }
    }
};
