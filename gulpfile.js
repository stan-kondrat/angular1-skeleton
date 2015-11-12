var gulp = require('gulp');
var browserSync = require('browser-sync');
var sourcemaps = require('gulp-sourcemaps');
var postcss = require('gulp-postcss');
var nested = require('postcss-nested');
var scss = require('postcss-scss');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var clean = require('gulp-clean');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
var protractor = require('gulp-protractor').protractor;

var buildFolder = './build';

var paths = {
  scripts: ['node_modules/angular/angular.js',
            'node_modules/angular-ui-router/build/angular-ui-router.js',
            'app/app.js',
            'app/app.config.js',
            'app/**/*.js', ],
  styles: 'app/**/*.css', // css or scss
  copy: ['app/index.html',
         'app/**/*.html',
         'app/**/*.js', ], // dev env only
  copy_assets: 'app/assets/**/*',
};

gulp.task('js', function() {
  gulp.src(paths.scripts)
    .pipe(plumber())
    .pipe(ngAnnotate())
    .pipe(sourcemaps.init())
      .pipe(concat('main.js'))

      // .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(buildFolder));
});

gulp.task('css', function() {
  var processors = [nested];
  gulp.src(paths.styles)
    .pipe(plumber())
    .pipe(sourcemaps.init())
      .pipe(concat('main.css'))
      .pipe(uglify())
    .pipe(postcss(processors, {syntax: scss}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(buildFolder));
});

gulp.task('copy', function() {
  gulp.src(paths.copy)
    .pipe(plumber())
    .pipe(gulp.dest('./build'));
  gulp.src(paths.copy_assets)
    .pipe(plumber())
    .pipe(gulp.dest(buildFolder + '/assets'));
});

gulp.task('browser-sync', function() {
  browserSync({
    files: [buildFolder + '/*', buildFolder + '/**/*'],
    server: {
      baseDir: buildFolder,
    },
  });
});

gulp.task('clean', function() {
  return gulp.src(buildFolder, {read: false})
    .pipe(plumber())
    .pipe(clean());
});

gulp.task('watch', function() {
  gulp.watch(paths.styles, ['css']);
  gulp.watch(paths.copy, ['copy']);
  gulp.watch(paths.copy_assets, ['copy']);
  gulp.watch(paths.scripts, ['js']);
});

gulp.task('build', ['js', 'css', 'copy']);

gulp.task('test', function() {
  gulp.src(['./e2e-tests/**/*.js'])
    .pipe(protractor({
      configFile: './e2e-tests/protractor.conf.js',
      args: [],
    }))
    .on('error', function(e) { throw e; });
});

gulp.task('default', ['build', 'watch', 'browser-sync']);

