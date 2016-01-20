'use strict';
/**
 * Gulpfile
 * Sets up tasks that can be run as part of build and deployment process.
 * Uses gulp/config.json for configuration of environment specific options and relative paths to different areas of the app.
 */

var gulp            = require('gulp'),
    glob            = require('glob'),
    fs              = require('fs');

/** 
 * Autoload all plugins prefaced with 'gulp-' and attach to the plugins object
*/
var plugins         = require("gulp-load-plugins")({
    pattern: ['gulp-*', 'gulp.*'],
    camelize: true,
    lazy: true,
    scope: ['devDependencies'],
    replaceString: /\bgulp[\-.]/
});

/** 
 * Initiate browserSync and attach to the plugins object
*/
plugins.browserSync = require('browser-sync').create();

/** 
 * Reads data from global config and attach to variables
*/
var config  = JSON.parse(fs.readFileSync('./gulp/config.json'));
var aws     = config.aws;
var path    = config.paths;
var opts    = config.options.dev;
if (plugins.util.env.prod === true) opts = config.options.prod;

/** 
 * Reads tasks directory and then requires and sets up gulp task based on file name
*/
glob.sync( path.tasks.src + '**/*.js'  ).forEach( function (file) {
    var task = require(file)( gulp, plugins, opts, path, aws );
    var name = file.replace( path.tasks.src, '' ).replace( '.js', '' );
    gulp.task( name, task );
});

/** 
 * Initiates default tasks dependent on whether --prod flag is set.
*/
if (plugins.util.env.prod === true)
    gulp.task('default', ['fonts', 'images', 'icons', 'sass', 'browserify', 's3']);
else
    gulp.task('default', ['sass', 'jshint', 'browserify', 'watch', 'browsersync']);

/** 
 * Install task for initial set up. Installs any bower dependencies, builds public asset folder 
*/
gulp.task('install', ['bower', 'sass', 'browserify', 'fonts', 'images', 'icons']);

