'use strict';
/**
 * Server
 * Used as part of default 'gulp' task.
 * To use on it's own run 'gulp server'.
 * Starts a local webserver
 */

module.exports = function (gulp, plugins, options, path, aws) {
  return function () {
      gulp.src(path.views.dest)
      .pipe(
        plugins.webserver({
          port: 3000, 
          host: 'localhost'
        })
      );
    };
};