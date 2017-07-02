module.exports = {
    port: process.env.PORT,
    server: {
        baseDir: "src",
        routes: {
            "/node_modules": "node_modules"
        }
    },
    watchOptions: {
        ignored: "node_modules"
    }
};
