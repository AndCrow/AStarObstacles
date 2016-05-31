'use strict';

module.exports = (gulp, plugins, config) => () => {
  gulp.watch(config.input.scss, gulp.series('build-scss'));
  gulp.watch(config.input.js, gulp.series('build-js'));
};
