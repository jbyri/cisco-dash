module.exports = {
    port: process.env.PORT,
    injectChanges: false,
    files: [ './src/**/*.{html,htm,css,js}' ],
    server: {
        baseDir: "src",
        routes: {
            "node_modules": "node_modules"
        }
    },
    watchOptions: {
        ignored: "node_modules"
    }
};
