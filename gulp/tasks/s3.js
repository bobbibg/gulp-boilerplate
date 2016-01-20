'use strict';
/**
 * S3
 * Used as part of default 'gulp' task using the --prod flag.
 * To use on it's own run 'gulp s3'.
 * Copies static assets to S3 bucket based on account details set in config.json
 */

module.exports = function (gulp, plugins, options, path, aws) {
    return function () {
       
	    var fontOptions = { headers: {'Cache-Control': 'max-age=290304000, no-transform, public'} };
        var imageOptions = { headers: {'Cache-Control': 'max-age=604800, no-transform, public'} };

        // Fonts
	    gulp.src(path.fonts.dest +'**')
        .pipe(
            plugins.s3(aws, fontOptions) 
        );

        // Icons
        gulp.src( path.icons.dest + '*.{png,json,ico,webapp,xml}' )
        .pipe(
           plugins.s3(aws) 
        );

        // Images
        gulp.src( path.icons.dest + '*.{png,json,ico,webapp,xml}' )
        .pipe(
           plugins.s3(aws, imageOptions) 
        );
	};
};