'use strict';
/**
 * Handlebars
 * Used as part of default 'gulp' task.
 * To use on it's own run 'gulp handlebars'.
 * Parses handlebars templates and renders to html
 */

module.exports = function (gulp, plugins, options, path, aws) {
  return function () {
    gulp.task('default', function () {

      var templateData = {

      };

      var hbsOptions = {
        ignorePartials: true, //ignores the unknown footer2 partial in the handlebars template, defaults to false 
        batch : [path.views.src + 'partials']
      };

      gulp.src(path.views.src + '/*.hbs')
      .pipe(
        plugins.compileHandlebars(templateData, hbsOptions)
      )
      .pipe(
        plugins.rename({ extname: '.html' })
      )
      .pipe(
        gulp.dest('dist')
      );
    });
  };
};