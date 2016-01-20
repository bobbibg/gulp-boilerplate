'use strict';
/**
 * Bower
 * Used as part of 'gulp install' main task.
 * To use on it's own run 'gulp bower'.
 * Equivalent of running bower install. 
 * Installs bower dependencies as defined in bower.json using configuration defined in .bowerrc.
 */

module.exports = function (gulp, plugins, options, path, aws) {
    return function () {
	    plugins.bower();
	};
};