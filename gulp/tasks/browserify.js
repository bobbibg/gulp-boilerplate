'use strict';
/**
 * Scripts
 * Used as part of default 'gulp' task, the gulp task with the --prod flag enabled as well as during 'gulp install'.
 * To use on it's own run 'gulp browserify'.
 * Uses browserify (http://browserify.org/) to bundle javascript modules and optionally builds sourcemap / minifies dependent on environment config.
 * Also copies across any library dependencies from assets/js/lib
 */

var del             = require('del');

module.exports = function (gulp, plugins, options, path, aws) {
    return function () {

        // clean destination
        del([path.scripts.dest]);

        gulp.src( path.scripts.src + path.scripts.entry )
        .pipe(
            plugins.browserify({
              debug : options.debug
            })
        )
        .pipe(
            plugins.if( options.minify, plugins.stripDebug() )
        )
        .pipe(
            plugins.if( options.minify, plugins.uglify() )
        )
        .pipe(
            plugins.rename({ extname: '.bundle.js' })
        )
        .pipe(
            gulp.dest( path.scripts.dest )
        )
        .pipe(
            plugins.browserSync.stream()
        );

    };
};