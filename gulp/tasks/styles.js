const gulp = require('gulp');
const noop = require('gulp-noop');
const sourcemaps = require('gulp-sourcemaps');
const less = require('gulp-less');
const autoprefixerModule = require('gulp-autoprefixer');
const autoprefixer = autoprefixerModule.default || autoprefixerModule;
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const sizeModule = require('gulp-size');
const size = sizeModule.default || sizeModule;
const browserSync = require('browser-sync');

const config = require('../config');
const errorHandler = require('../utils/error-handler');

module.exports = function stylesTask() {
    return gulp.src(config.path.src.styles)
        .pipe(errorHandler('styles'))
        .pipe(config.isProduction ? noop() : sourcemaps.init())
        .pipe(less())
        .pipe(autoprefixer('> 2%'))
        .pipe(gcmq())
        .pipe(concat(config.bundle.css))
        .pipe(cleanCSS())
        .pipe(config.isProduction ? noop() : sourcemaps.write('./'))
        .pipe(size({ title: 'CSS' }))
        .pipe(gulp.dest(config.path.dest.styles))
        .pipe(browserSync.reload({ stream: true }));
};
