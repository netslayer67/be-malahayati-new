const gulp = require('gulp');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');

function build() {
    return gulp
        .src('src/*.js')
        .pipe(uglify())
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest('dist'));
}

exports.default = build;
