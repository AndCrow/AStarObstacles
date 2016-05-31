'use strict';

const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const config = require('./gulp/configs/config');

var tasks = [
  'build-js',
  'build-scss',
  'watch'
];

//register tasks
tasks.forEach(function(task){
  gulp.task(task, require(`./gulp/${task}`)(gulp, plugins, config));
});

gulp.task('build',
  gulp.parallel(
    'build-js',
    'build-scss'
  )
);
gulp.task('default', gulp.series('build', 'watch'));
