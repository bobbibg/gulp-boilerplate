'use strict';
/**
 * Favicons
 * Used as part of default gulp task when using the --prod flag.
 * Can be run individually by running 'gulp icons'.
 * Takes a 1024x1024 image and automatically creates each favicon/ device icon in output folder relative to the parent.
 */

var pngquant = require('imagemin-pngquant'),
    favicons = require('favicons');

module.exports = function (gulp, plugins, options, path, aws) {
    return function () {
        var favOptions = {
            files: {
                src: path.icons.src + 'Apple-Icon.png',
                dest: path.icons.dest
            }
        };
        
        favicons(favOptions);
    };
};