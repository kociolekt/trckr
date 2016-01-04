var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var babelify = require('babelify');
var NwBuilder = require('nw-builder');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');

var config = {
  log: console.log,
  error: console.error
};

/* Node-Webkit build */
config.nw = {
  files: './resources/**/**', // nw app files
  buildDir: './build',
  cacheDir: './cache',
  platforms: ['win64'],
  version: '0.12.3'
};

gulp.task('nw', function() {
  setTimeout(function() {
    var nw = new NwBuilder(config.nw);
    //Log stuff you want
    nw.on('log',  config.log);
    // Build returns a promise
    nw.build().then(function () {
      config.log('all done!');
    }).catch(function (error) {
      config.error(error);
    });
  }, 100);
});

/* Scripts */
config.scripts = {
  src: './src/js/**/*.js',
  browserify: {
    entries: './src/js/main.js',
    debug: true,
    transform: [
      babelify.configure({
        plugins: ['transform-object-assign'],
        presets: ['es2015']
      }),
      'jstify'
    ]
  },
  source: 'main.js',
  dest: './resources/assets'
};

gulp.task('scripts', function () {
  return browserify(config.scripts.browserify)
    .bundle()
    .pipe(source(config.scripts.source))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    //.pipe(uglify())
    .on('error', config.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.scripts.dest));
});

gulp.task('scripts:watch', function () {
  gulp.watch(config.scripts.src, ['scripts', 'nw']);
});

/* Styles */
config.styles = {
  src: './src/sass/**/*.scss',
  dest: './resources/assets'
};

gulp.task('styles', function () {
  gulp.src(config.styles.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(config.styles.dest));
});

gulp.task('styles:watch', function () {
  gulp.watch(config.styles.src, ['styles', 'nw']);
});


/* Main tasks */
gulp.task('build', ['scripts', 'styles', 'nw']);
gulp.task('watch', ['build', 'scripts:watch', 'styles:watch']);
gulp.task('default', ['watch']);

