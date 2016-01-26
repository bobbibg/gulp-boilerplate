'use strict';
/**
 * Liquid
 * Used as part of default 'gulp' task.
 * To use on it's own run 'gulp liquid'.
 * Parses liquid templates and renders to html.
 */

module.exports = function (gulp, plugins, options, path, aws) {
    return function () {

    	var locals = {
    		name: "Rob"
    	};


		gulp.src(path.views.src + '*.liquid')
		.pipe(
			plugins.liquify(locals)
		)
        .pipe(
            plugins.rename({ extname: '.html' })
        )
		.pipe(
			gulp.dest(path.views.dest)
		);
	};
};