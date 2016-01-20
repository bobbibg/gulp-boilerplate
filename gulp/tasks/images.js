'use strict';
/**
 * Images
 * Used as part of default 'gulp' task.
 * To use on it's own run 'gulp images'.
 * Optimizes images and copies to public directory.
 */

 var pngquant        = require('imagemin-pngquant'),
     optipng         = require('imagemin-optipng'),
     jpegoptim       = require('imagemin-jpegoptim'),
     svgo            = require('imagemin-svgo'),
     del             = require('del');

// IMAGES
module.exports = function (gulp, plugins, options, path, aws) {
    return function () {

        del([path.images.dest]);

        //return image paths
        gulp.src( path.images.src + '**/*.{png,jpg,jpeg,gif,svg}' )
        //cache
        .pipe(
            plugins.cached('images')
        )
        //quant pngs, lossy but unnoticeable compression  
        .pipe(
            pngquant({ quality: '65-80', speed: 4 })()
        )
        //remove meta / unnecessary data from pngs
        .pipe(
            optipng({ optimizationLevel: 3 })()
        )
        //optimize jpgs
        .pipe(
            jpegoptim({ max: 90, progressive: true })()
        )
        //minify svg
        .pipe(
            svgo()()
        )
        //copy to local destination
        .pipe(
             gulp.dest(path.images.dest)
        );

    };
};