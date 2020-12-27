const gulp = require('gulp');
const { parallel } = gulp;
const concat = require('gulp-concat');

/**
 * Gulp parameter.
 * 
 * @link https://www.sitepoint.com/pass-parameters-gulp-tasks/
 */
const args = (argList => {
    let arg = {}, a, opt, thisOpt, curOpt;

    for (a = 0; a < argList.length; a++) {
        thisOpt = argList[a].trim();
        opt = thisOpt.replace(/^\-+/, '');

        if (opt === thisOpt) {  
            // argument value
            if (curOpt) arg[curOpt] = opt;
            curOpt = null;
        } else {
            // argument name
            curOpt = opt;
            arg[curOpt] = true;
        }
    }
    return arg;
})(process.argv);

/**
 * Compile SCSS file.
 */
const sass = require('gulp-sass');
const stripCssComments = require('gulp-strip-css-comments');

function SCSS_Compiler(page, files) {
    const config = require('./config.json');

    if (config.core !== undefined && !config.core) {
        var scss = files.scss;
    } else {
        var scss = config.core.scss.concat(files.scss);
    }

    return scss.length === 0 ? false : gulp
        .src(scss)
        .pipe(stripCssComments({ preserve: false }))
        .pipe(concat(page + '.scss'))
        .pipe(gulp.dest('./_compiler/scss'))
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(gulp.dest('./dist/css'));
}

function SCSS(cb) {
    const config = require('./config.json');
    if (args.page === undefined) {
        for (page in config.pages) {
            SCSS_Compiler(page, config.pages[page]);
        }
    } else {
        SCSS_Compiler(args.page, config.pages[args.page]);
    }
    cb();
}

/**
 * Compile JS file.
 */
const uglify = require('gulp-uglify-es').default;

function JS_Compiler(page, files) {
    const config = require('./config.json');
    var js = config.core.js.concat(files.js);

    return js.length === 0 ? false : gulp
        .src(js)
        .pipe(concat(page + '.js'))
        .pipe(gulp.dest('./_compiler/js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'))
}

function JS(cb) {
    const config = require('./config.json');
    if (args.page === undefined) {
        for (page in config.pages) {
            JS_Compiler(page, config.pages[page]);
        }
    } else {
        JS_Compiler(args.page, config.pages[args.page]);
    }
    cb();
}

/**
 * Run task parallel.
 */
exports.default = parallel(SCSS, JS);