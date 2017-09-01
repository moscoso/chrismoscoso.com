/* jshint node: true */

var gulp = require('gulp');

/* Browser Sync helps make web development easier by spinning up a web server that helps us do live-reloading easily. */
var browserSync = require('browser-sync').create();

/* Gulp-useref concatenates any number of CSS and JavaScript files into a single file by looking for a comment that starts with "<!--build:" and ends with "<!--endbuild-->". */
var useref = require('gulp-useref');

/*This gulp plugin minifies js files*/
var uglify = require('gulp-uglify');

/*This gulp plugin lets you verify a file by filetype*/
var gulpIf = require('gulp-if');

/*This gulp plugin minifies css files*/
var cssnano = require('gulp-cssnano');

/*This gulp plugin minifies image (png, jpg, gif and even svg) files */
var imagemin = require('gulp-imagemin');

/* Optimizing images however, is an extremely slow process that you'd not want to repeat unless necessary. To do so, we can use the gulp-cache plugin. */
var cache = require('gulp-cache');

/* Gulp activates all tasks in the second argument simultaneously. So to remedy this we need to use an extra plugin called RunSequence */
var runSequence = require('run-sequence');

/*This plugin helps delete (clean) files */
var del = require('del');

/*This plugin removes unused css */
var uncss = require('gulp-uncss');

/*This plugin allows you to rename files */
var rename = require('gulp-rename');

/*Prevent pipe breaking caused by errors from gulp plugins*/
var plumber = require('gulp-plumber');

/*Finds unused graphics inside text files (html|css|js) and deletes them.*/
var deleteUnusedImages = require('gulp-delete-unused-images');


gulp.task('build', function(callback) {
        runSequence('clean:dist',  'useref', 'images', /*'delete-unused-images',*/ 'videos', 'minify', 'pdf', function(){});
});


gulp.task('default', function() {
  // place code for your default task here
  runSequence('watch', function(){});
});

//Reload when any of the watched files are saved
gulp.task('watch', ['browserSync'], function(){
	gulp.watch('src/*.html', browserSync.reload); 
	gulp.watch('src/**/*.css', browserSync.reload); 
       gulp.watch('src/js/**/*.js', browserSync.reload); 
});


//Merge js and css code into one file each in the dist folder
gulp.task('useref', function(){
      return gulp.src('src/*.html')
      .pipe(useref())
      .pipe(gulp.dest('dist'));
});

//Clear the dist folder
gulp.task('clean:dist', function() {
      return del.sync('dist');
});

gulp.task('uncss-copy', function(){
 return gulp.src('src/css/*.css').pipe(uncss({
      html: ['src/index.html']
}))
 .pipe(gulp.dest('src/uncss'));
});

//Minify css
gulp.task('mincss', function () {
      return gulp.src([
            'dist/css/**/*.css',
            'dist/!css/**/*.min.css',
            ])
      .pipe(cssnano())
      .pipe(gulp.dest('dist/css'))
      /*.pipe(rename(function(path) {
            path.extname = ".min.css";
    }))*/;
});

//Minify js
gulp.task('minjs', function () {
      return gulp.src([
            'dist/js/**/*.js',
            'dist/!js/**/*.min.js',
            ])
      .pipe(uglify())
      .pipe(gulp.dest('dist/js'))
      /*.pipe(rename(function(path) {
            path.extname = ".min.js";
    }))*/;
});

gulp.task('minify', function(){
      runSequence('mincss', 'minjs', function(){});
});


//Optimize images
gulp.task('images', function(){
      return gulp.src('src/img/**/*.+(png|jpg|gif|svg)')
      .pipe(cache(imagemin()))
      .pipe(gulp.dest('dist/img'));
});

//Delete unused images
gulp.task('delete-unused-images', function(){
      gulp.src(['dist/img/**/*', 'dist/index.html', 'dist/css/main.css', 'dist/css/main.js'])
      .pipe(plumber())
      .pipe(deleteUnusedImages({
            log: false,
            delete: true
    }));
});


//Clear cache
gulp.task('cache:clear', function (callback) {
      return cache.clearAll(callback);
});

//Copy resume.pdf to dist folder
gulp.task('pdf', function(){
      return gulp.src('resume.pdf')
      .pipe(gulp.dest('dist'));
});

//copy vid folder
gulp.task('videos', function(){
	return gulp.src('vid/*')
	.pipe(gulp.dest('dist'));
});

//copy vendor (copy all FOLDERS EVENTUALLY, inserting this task manually blows)
gulp.task('vendors', function(){
	//THIS DOESNT EVENT WORK LMAO
});

gulp.task('browserSync', function() {
      browserSync.init({
            server: {
                  baseDir: 'src'
          },
  });
});

