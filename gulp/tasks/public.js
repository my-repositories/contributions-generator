const gulp = require('gulp');

const config = require('../config');

module.exports = function publicTask() {
    return gulp.src(config.path.src.public, { allowEmpty: true })
        .pipe(gulp.dest(config.path.dest.public));
};
