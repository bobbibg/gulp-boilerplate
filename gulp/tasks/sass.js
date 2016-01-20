'use strict';
/**
 * Styles
 * Used as part of default 'gulp' task, the gulp task with the --prod flag enabled as well as during 'gulp install'.
 * To use on it's own run 'gulp styles'.
 * Compiles sass files using libsass and optionally builds sourcemap / minifies dependent on environment config.
 */

var del = require('del');

module.exports = function (gulp, plugins, options, path, aws) {
    return function () {
        // Clear destination
        del([path.styles.dest]);

        gulp.src(path.styles.src + '*.scss')
        .pipe(
            plugins.if( 
                options.sourcemap, plugins.sourcemaps.init()
            )
        )
        .pipe(
            plugins.sass().on('error', function(err){
                plugins.sass.logError;
                new plugins.util.PluginError('SCSS', err, {showStack: true});
            })
        )
        .pipe(
            plugins.if( 
                options.sourcemap, plugins.sourcemaps.write()
            )
        )
        .pipe(
            plugins.if( 
                options.minify, plugins.combineMq({
                    beautify: false
                })
            )
        )
        .pipe(
            plugins.if( 
                options.minify, plugins.autoprefixer({
                    browsers: ['last 2 version'],
                    cascade: false
                })
            )
        )
        .pipe(
            plugins.if( 
                options.minify, plugins.minifyCss() 
            )
        )
        .pipe(
            gulp.dest( path.styles.dest )
        )
        .pipe(
            plugins.browserSync.stream()
        );
    };
};