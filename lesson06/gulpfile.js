var gulp = require('gulp');
var bower = require('gulp-bower');
// var gulpif = require( 'gulp-if' );
var concat = require('gulp-concat');
var less = require('gulp-less');
var argv = require('yargs').argv;
<<<<<<< HEAD
var clean = require( 'gulp-clean' );
// var livereload = require('gulp-livereload');
=======
var clean = require('gulp-clean');
>>>>>>> 434869a3a12768e7f63befcc375cd48d24191f95
var handlebars = require('gulp-handlebars');
var wrap = require('gulp-wrap');
var declare = require('gulp-declare');
var runSequence = require('run-sequence');
<<<<<<< HEAD
var browserify = require( 'gulp-browserify' );
var ctCreator = require( 'ct-creator' );
var browserSync = require('browser-sync').create();
=======
var browserify = require('gulp-browserify');
//var ctCreator = require('ct-creator');
// var eslint = require( 'gulp-eslint' );
var browserSync = require('browser-sync').create();

>>>>>>> 434869a3a12768e7f63befcc375cd48d24191f95

var DEST_DIR = 'client_build';
var DEST_LIBS_DIR = DEST_DIR + '/libs';
var CLIENT_DIR = 'client_src';

<<<<<<< HEAD
gulp.task('browserSync', function (cb) {
    browserSync.init({
        server: {
            baseDir: DEST_DIR
        }
    });
});

gulp.task('default', function (cb) {
    runSequence('build', cb);
=======
gulp.task('default', (cb) => {
  runSequence('build', cb);
>>>>>>> 434869a3a12768e7f63befcc375cd48d24191f95
});

gulp.task('dev', ['build'], (cb) => {
  runSequence('watch');
  cb();
});

gulp.task('build', (cb) => {
  runSequence(
        'clean-build',
        'copy-src',
        ['bower', 'browserify', 'templates', 'concat-component-css'],
        cb
    );
});

gulp.task('browserify', () => {
  gulp.src('client_src/form.js')
        .pipe(browserify({
          insertGlobals: true,
          paths: ['client_src'],
          debug: !gulp.env.production,
        }))
        .pipe(gulp.dest(DEST_DIR));
});

gulp.task('copy-src', () => {
  return gulp.src(CLIENT_DIR + '/**')
        .pipe(gulp.dest(DEST_DIR));
});

gulp.task('bower', () => {
  return bower(DEST_LIBS_DIR);
});

gulp.task('concat-component-css', () => {
  return gulp.src(CLIENT_DIR + '/**/*.css')
        .pipe(concat('components.css'))
        .pipe(less())
        .pipe(gulp.dest(DEST_DIR));
});

gulp.task('templates', () => {
  return gulp.src(CLIENT_DIR + '/**/*.hbs')
        .pipe(handlebars())
        .pipe(wrap('Handlebars.template(<%= contents %>)'))
        .pipe(declare({
          namespace: 'App.templates',
          noRedeclare: true,
        }))
        .pipe(concat('templates.js'))
        .pipe(gulp.dest(DEST_DIR));
});

<<<<<<< HEAD
gulp.task('clean-build', function (cb) {
    return gulp.src(DEST_DIR + '/*', {read: false})
        .pipe(clean({force: true}));
} );

gulp.task('watch', ['browserSync'], function (cb) {
    gulp.watch(CLIENT_DIR + '/**/*.@(html|js|hbs|css)', ['build']);
    gulp.watch(CLIENT_DIR + '/**/*.*').on('change', browserSync.reload());
=======
gulp.task('clean-build', () => {
  return gulp.src(DEST_DIR + '/*', { read: false })
        .pipe(clean({ force: true }));
});

gulp.task('watch', ['b-sync'], () => {
  gulp.watch(CLIENT_DIR + '/**/*.@(html|js|css|hbs)', ['build-and-reload']);
});

gulp.task('b-sync', () => {
  return browserSync.init({
    server: {
      baseDir: DEST_DIR,
    },
  });
});

gulp.task('build-and-reload', ['build'], () => {
  browserSync.reload();
  return gulp.src(DEST_DIR + '/**');
>>>>>>> 434869a3a12768e7f63befcc375cd48d24191f95
});

// Compoment creator
gulp.task('component', () => {
  ctCreator.create('client_src/components', argv.name);
});
gulp.task('container', () => {
  ctCreator.create('client_src/containers/', argv.name);
});

