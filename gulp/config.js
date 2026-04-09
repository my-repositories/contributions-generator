const resolvePath = require('./utils/resolve-path');

module.exports = resolvePath({
    isProduction: process.argv.includes('--production'),
    path: {
        dest: {
            layout: 'dest/',
            public: 'dest/',
            scripts: 'dest/js/',
            styles: 'dest/css/',
        },
        src: {
            layout: 'src/index.html',
            public: 'public/**/*',
            scripts: 'src/scripts/main.js',
            styles: 'src/styles/**/*.less',
        },
        clean: ['dest/**/*', '!dest/.gitignore', '!dest/favicon.ico'],
    },
    bundle: {
        html: 'index.html',
        js: 'bundle.min.js',
        css: 'styles.min.css',
    },
    watch: {
        host: 'localhost',
        port: 3000,
        logPrefix: 'BrowserSync',
    },
});
