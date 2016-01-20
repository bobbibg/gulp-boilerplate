'use strict';
/**
 * Browsersync
 * Used as part of default 'gulp' task.
 * To use on it's own run 'gulp browsersync'.
 * Sets up a proxy of the server at localhost:7000 that auto-refreshes when styles/ scripts are changed.
 */

module.exports = function (gulp, plugins, path, aws) {
	return function () {
	    plugins.browserSync.init(null, {
	        proxy: "http://localhost:3000",
	        files: ["/public/**/*.*"],
	        browser: "google chrome",
	        port: 7000,
	        open: false,
	        reloadOnRestart: true
	    });
	};
};