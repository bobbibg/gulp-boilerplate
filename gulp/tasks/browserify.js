'use strict';
/**
 * Scripts
 * Used as part of default 'gulp' task, the gulp task with the --prod flag enabled as well as during 'gulp install'.
 * To use on it's own run 'gulp scripts'.
 * Uses browserify (http://browserify.org/) to bundle javascript modules and optionally builds sourcemap / minifies dependent on environment config.
 * Also copies across any library dependencies from assets/js/lib
 */

var del             = require('del'),
    browserify      = require('browserify'),
    source          = require('vinyl-source-stream'),
    buffer          = require('vinyl-buffer');

module.exports = function (gulp, plugins, options, path, aws) {
    return function () {

        // clean destination
        del([path.scripts.dest]);

        // add details of bundles
        var srcArray = [
            {   dev: path.scripts.src, 
                scriptName: "scripts",
                dest: path.scripts.dest
            }
        ];   

        // loops through scripts and bundles
        for(var i = 0; i < srcArray.length; ++i) {

            var src = srcArray[i].dev + srcArray[i].scriptName + '.js';

            var b = browserify({entries:src, debug: options.debug})
            
            b.bundle()

            .on('error', function(err){
                new plugins.util.PluginError('Browserify', err, {showStack: true});
            })
            .pipe(
                source(srcArray[i].scriptName)
            )
            .pipe(
                plugins.if( options.minify, buffer() )
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
                gulp.dest( srcArray[i].dest )
            )
            .pipe(
                plugins.browserSync.stream()
            );
        };
    };
};