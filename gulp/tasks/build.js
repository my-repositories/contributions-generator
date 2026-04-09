const gulp = require('gulp');

const cleanTask = require('./clean');
const layoutTask = require('./layout');
const publicTask = require('./public');
const scriptsTask = require('./scripts');
const stylesTask = require('./styles');

module.exports = gulp.series(
    cleanTask,
    gulp.parallel(layoutTask, publicTask, scriptsTask, stylesTask),
);
