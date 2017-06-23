var gulp = require('gulp');
var ts = require('gulp-typescript');
var minifyJS = require('gulp-jsmin');
var less = require('gulp-less');
var minifyCSS = require('gulp-csso');
var optimizeIMG = require('gulp-imagemin');

gulp.task('js', function(){
  return gulp.src('www/ts/*.ts')
    .pipe(ts())
    .pipe(minifyJS())
    .pipe(gulp.dest('www/js'))
});

gulp.task('css', function(){
  return gulp.src('www/less/*.less')
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(gulp.dest('www/css'))
});

gulp.task('default', [ 'js', 'css']);

gulp.task('img', function() {
    return gulp.src([
        'www/img/*.jpg',
        'www/img/*.jpeg',
        'www/img/*.png',
        'www/img/*.gif',
        'www/img/*.svg'])
        .pipe(optimizeIMG())
        .pipe(gulp.dest('www/img'))
})
