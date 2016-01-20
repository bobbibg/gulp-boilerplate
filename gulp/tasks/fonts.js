'use strict';
/**
 * Fonts
 * Used as part of default 'gulp' task.
 * To use on it's own run 'gulp fonts'.
 * Copies fonts to public directory
 */

var del = require('del');

module.exports = function (gulp, plugins, options, path, aws) {
    return function () {
	    gulp.src(path.fonts.src +'**')
	    .pipe(
	    	plugins.cached('fonts')
	    )
        .pipe(
             gulp.dest(path.fonts.dest)
        );
	};
};