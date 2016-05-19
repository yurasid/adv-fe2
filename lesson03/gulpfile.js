var destDir = 'bin';
var gulp = require('gulp');
var bower = require('gulp-bower');
var gulpif = require('gulp-if');
var concat = require('gulp-concat');
var less = require('gulp-less');
var argv = require('yargs').argv;
var debug = require('gulp-debug');
var clean = require('gulp-clean');
var livereload = require('gulp-livereload');
var csscomb = require('gulp-csscomb');
var jscs = require('gulp-jscs');
var jscsStylish = require('gulp-jscs-stylish');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var runSequence = require('run-sequence');
// var minifyCss = require('gulp-minify-css');
var cssnano = require('gulp-cssnano');
var sourcemap = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var htmlhint = require('gulp-htmlhint');
var htmlmin = require('gulp-htmlmin');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var gitmodified = require('gulp-gitmodified');
var bsync = require('browser-sync').create();

gulp.task('default', function () {
    return runSequence('clean', ['libs', 'css', 'js', 'images', 'html']);
});

gulp.task('build', ['copy-static', 'css']);

gulp.task('libs', function () {
    return gulp.src(['libs/**/*.min.js'])
    .pipe(gulp.dest(destDir + '/libs'));
});

gulp.task('images', function () {
    return gulp.src(['!node_modules{,/**}', '!libs{,/**}', '**/*.{png,jpg,svg}'])
        .pipe(gulpif(argv.prod, imagemin({
            optimizatonLevel: 5,
            progressive: true
        })))
        .pipe(gulp.dest(destDir));
});

gulp.task('html', function () {
    return gulp.src(['!node_modules{,/**}', '!libs{,/**}', '**/*.html'])
        .pipe(gulpif(argv.prod, htmlmin({
            collapseWhitespace: true
        })))
        .pipe(gulp.dest(destDir));
});

gulp.task('copy-static', function () {
    return gulp.src(['images/**/*.{png,jpg,svg}', '*.html', '**.*.js'])
        .pipe(gulp.dest(destDir));
});

gulp.task('bower', function () {
    return bower('libs');
});

gulp.task('css', function () {
    return gulp.src('styles/**/*.less')
    .pipe(gulpif(argv.prod, sourcemap.init()))
    .pipe(concat('styles.css'))
    .pipe(less())
    .pipe(autoprefixer({
        browsers: ['last 5 versions'],
        cascade: false
    }))
    .pipe(cssnano())
    .pipe(gulpif(argv.prod, sourcemap.write()))
    .pipe(gulp.dest(destDir + '/static'))
    .pipe(bsync.stream());
});

gulp.task('js', function () {
    return gulp.src('js/**/*.js')
    .pipe(gulpif(argv.prod, sourcemap.init()))
    .pipe(concat('script.js'))
    .pipe(uglify())
    .pipe(gulpif(argv.prod, sourcemap.write()))
    .pipe(gulp.dest(destDir));
});

gulp.task('browserSync', function () {
    bsync.init({
        server: { baseDir: destDir }
    });
});

gulp.task('clean', function () {
    return gulp.src(destDir + '/*', { read: false })
    .pipe(clean({ force: true }));
});

gulp.task('watch', ['browserSync'], function () {
    gulp.watch('styles/**/*.@(less)', ['css']);
    gulp.watch('images/**/*.{png,jpg,svg}', ['images']);
    gulp.watch('*.html', ['html']);
    gulp.watch('js/**/*.js', ['js']);

    gulp.watch(destDir + '/**/*.js', bsync.reload);
    gulp.watch(destDir + '/*.html', bsync.reload);
});

// Start CODESTYLE

gulp.task('csscomb', function () {
    return gulp.src('styles/*.less')
    .pipe(gitmodified('modified'))
    .on('data', function (files) {
        console.log('Modified files: ', files);
    })
    .pipe(csscomb().on('error', handleError))
    .pipe(gulp.dest(function (file) {
        return file.base;
    }));
});

gulp.task('htmlhint', function () {
    return gulp.src('*.html')
    .pipe(htmlhint('.htmlhintrc').on('error', handleError))
    .pipe(htmlhint.reporter('htmlhint-stylish'));
});

gulp.task('jscs', function () {
    return gulp.src('js/**/*.js')
    .pipe(gitmodified('modified'))
    .pipe(jscs({ fix: 'true' }).on('error', handleError))
    .pipe(jscs.reporter(jscsStylish))
    .pipe(gulp.dest(function (file) {
        return file.base;
    }));
});

gulp.task('jshint', function () {
    return gulp.src('js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish', { verbose: true }));
});

gulp.task('style', function () {
    return runSequence('htmlhint', 'csscomb', 'jscs', 'jshint');
});

function handleError(err) {
    console.log(err.toString());
    this.emit('end');
    return this;
}
