'use strict';
var gulp = require("gulp");
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var path = require('path');
var minifyCss = require('gulp-minify-css');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var batch = require('gulp-batch');
var del = require('del');
var runSequence = require('run-sequence').use(gulp);
var dirs = {
	css: './public/build/css/',
	js: './public/build/js/'
};

function swallowError(error) {
	console.log(error);
	this.emit('end');
}

gulp.task('default', ['build'], function () {

});

gulp.task('build', function (callback) {
	runSequence('clean', ['css', 'js'], callback);
});

gulp.task('css', function () {
	return gulp.src('./public/less/**/*.less')
			.pipe(plumber({
				errorHandler: swallowError
			}))
			.pipe(less({
				paths: [ path.join(__dirname, 'less', 'includes') ]
			}))
			.pipe(autoprefixer('last 2 version'))
			.pipe(rename({suffix: '.min'}))
			.pipe(minifyCss())
			.pipe(gulp.dest(dirs.css));
});

gulp.task('js', function () {
	return gulp.src('./public/js/**/*.js')
			.pipe(plumber({
				errorHandler: swallowError
			}))
			.pipe(concat("app.js"))
			.pipe(gulp.dest(dirs.js))
			.pipe(rename({suffix: '.min'}))
			.pipe(uglify())
			.pipe(gulp.dest(dirs.js));
});

gulp.task('clean', function () {
	return del([dirs.css, dirs.js]);
});

gulp.task('watch', ['build'], function () {
	watch('./public/less/**/*.less', batch(function (events, done) {
		gulp.start('css', done);
	}));
	watch('./public/js/**/*.js', batch(function (events, done) {
		gulp.start('js', done);
	}));
});