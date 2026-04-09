const gulp = require('gulp');
const replace = require('gulp-token-replace');
const htmlmin = require('gulp-htmlmin');
const sizeModule = require('gulp-size');
const size = sizeModule.default || sizeModule;
const browserSync = require('browser-sync');

const config = require('../config');
const errorHandler = require('../utils/error-handler');
const project = require('../../package.json');

const global = {
    project: {
        author: project.author,
        description: project.description,
        keywords: project.keywords.join(', '),
        name: project.name,
        version: project.version,
    },
    config: {
        bundle: {
            js: config.bundle.js,
            css: config.bundle.css,
        },
    },
};

module.exports = function layoutTask() {
    return gulp.src(config.path.src.layout)
        .pipe(errorHandler('layout'))
        .pipe(replace({ global }))
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(size({ title: 'HTML' }))
        .pipe(gulp.dest(config.path.dest.layout))
        .pipe(browserSync.reload({ stream: true }));
};
