'use strict';

const webpackStream = require('webpack-stream');
const webpackConfig = require('./configs/webpack.config');

module.exports = (gulp, plugins, config) => () => {
  return gulp.src(config.input.entry)
    .pipe(webpackStream(webpackConfig))
    .pipe(gulp.dest(`${config.output.dist}/${config.output.js}`))
    .pipe(plugins.notify({message: 'JS built', onLast: true}));
};
