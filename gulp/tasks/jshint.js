'use strict';
/**
 * JSHint
 * Used as part of default 'gulp' task.
 * To use on it's own run 'gulp jshint'.
 * Runs jshint options as configured in .jshintrc.
 * JSHint is a tool that helps to detect errors and potential problems in your JavaScript code.
 */

module.exports = function (gulp, plugins, options, path, aws) {
    return function () {
		gulp.src([path.scripts.src + '**/*.js', '!' + path.scripts.src + 'lib/*.js'])
	    .pipe(
	    	plugins.cached('lint')
	    )
	    .pipe(
	    	plugins.jshint()
	    )
	    .pipe(
	    	plugins.jshint.reporter('jshint-stylish')
	    );
	};
};