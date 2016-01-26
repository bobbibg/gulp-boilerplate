'use strict';
/**
 * Watch
 * Used as part of default 'gulp' task.
 * To use on it's own run 'gulp watch'.
 * Watches for changes in files and reruns appropriate tasks.
 */

module.exports = function (gulp, plugins, options, path, aws) {
	var changeEvent = function(evt, basePath) {
	    plugins.util.log(
	    	'File', plugins.util.colors.cyan(
	    		evt.path.replace(new RegExp('/.*(?=/' + basePath + ')/'), '')
	    	), 'was', plugins.util.colors.magenta(evt.type));
	};

    return function () {
    	// images
	    gulp.watch(path.images.src     + '**/*.{png,jpg,jpeg,svg,gif}', ['images']).on('change', function(evt) {
	        changeEvent(evt, path.images.src);
	    });	

	    // fonts
	    gulp.watch(path.fonts.src      + '**/*.{eot,svg,ttf,woff}', ['fonts']).on('change', function(evt) {
	        changeEvent(evt, path.fonts.src);
	    });

	    // styles
	    gulp.watch(path.styles.src     + '**/*.scss', ['sass']).on('change', function(evt) {
	        changeEvent(evt, path.styles.src);
	    });

		// scripts
	    gulp.watch(path.scripts.src    + '**/*.js', ['jshint', 'browserify']).on('change', function(evt) {
	        changeEvent(evt, path.scripts.src);
	    });
	    
		// liquid templates
	    gulp.watch(path.views.src    + '**/*.liquid', ['liquid']).on('change', function(evt) {
	    	plugins.browserSync.reload();
	        changeEvent(evt, path.views.src);
	    });
	};
};