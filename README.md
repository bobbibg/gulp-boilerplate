# Gulp Boilerplate
This is a boilerplate gulp setup that I use across multiple projects to initiate my build process.

Each task has been seperated into it's own seperate file so it's easy to pick and choose which tasks are relevant for each project.

## Installation
1. `npm install` to install dependencies

## Usage
This gulp process assumes a folder structure where files in the folder 'assets' are compiled and optimised into a folder called 'public'. Sources and destinations, as well as other settings can be customised in 'gulp/config.json'.

Sub-tasks can individually be called by running `gulp [taskname]` for each sub-task. 

Default tasks are defined in the gulpfile and are initially set up to run as follows.

1. `gulp` for development tasks. Compiles SASS and JS, runs a linter over the JS, kicks off a browserSync instance and watches for changes.
1. `gulp --prod` for production tasks. Compiles and minifies SCSS and JS and moves images to S3.
1. On initial installation `gulp install` can be run a one-off compilation of all the files to create the initial file structure and install any bower dependencies.
