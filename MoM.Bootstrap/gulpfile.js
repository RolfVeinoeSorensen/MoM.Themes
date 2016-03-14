/// <binding ProjectOpened='watch' />
"use strict";

var gulp = require("gulp"),
    runSequence = require("run-sequence"),
    tslint = require("gulp-tslint"),
    typescript = require('gulp-typescript'),
    sass = require('gulp-ruby-sass'),
    notify = require("gulp-notify"),
    bower = require('gulp-bower'),
    rimraf = require('rimraf'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename');

var paths = {
    module: '/MoM.Bootstrap',
    dist: './dist/',
    dest: "../../MoM/MoM.Web/wwwroot/",
    bootstrap: '../../node_modules/bootstrap/scss',
    fontawsome: '../../node_modules/font-awesome/',
    sassSrcPath: './Sass/**/*.scss',
    sassSrcAppPath: "./Sass/**/app.scss"
};

gulp.task('css', ['clean-dist'], function () {
    return sass(paths.sassSrcAppPath, {
        loadPath: [
            paths.bootstrap,
            paths.fontawsome + 'scss'
        ]
    })
    .on("error", notify.onError(function (error) {
        return "Error: " + error.message;
    }))
    .pipe(gulp.dest(paths.dist + "css" + paths.module));
});

gulp.task('css-min', ['clean-dist'], function () {
    return sass(paths.sassSrcAppPath, {
        loadPath: [
            paths.bootstrap,
            paths.fontawsome + 'scss'
        ]
    })
    .on("error", notify.onError(function (error) {
        return "Error: " + error.message;
    }))
    .pipe(cssmin())
	.pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.dist + "css" + paths.module));
});

gulp.task('fonts', ['clean-dist'], function () {
    return gulp.src(paths.fontawsome + 'fonts/**/*')
    .pipe(gulp.dest(paths.dist + "fonts"));
})

gulp.task('fonts-css', ['clean-dist'], function () {
    return gulp.src(paths.fontawsome + 'css/**/*')
    .pipe(gulp.dest(paths.dist + "css"));
})

gulp.task('clean-dist', function (cb) {
    rimraf('./dist', cb);
});

gulp.task('copy-dest', ['clean-dist', 'css', 'css-min', 'fonts', 'fonts-css'], function () {
    gulp.src(paths.dist + '**/*.*/')
    .pipe(gulp.dest(paths.dest))
});

gulp.task('watch', function () {
    gulp.watch(paths.sassSrcPath, ['copy-dest']);
});