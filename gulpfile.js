// jshint esversion: 6
var gulp = require('gulp');
// var typescript = require('gulp-tsc');
var ts = require("gulp-typescript");
var sass = require('gulp-sass');
var gulpClean = require('gulp-clean');

var tsProject = ts.createProject("src/tsconfig.json");
var tsE2ETests = ts.createProject("e2e/tsconfig.json");
var del = require("del");

var distDir = 'dist/';

var serverDir = '/var/www/html/';
// main task
gulp.task('default', ['tsCompile', 'sass']);
gulp.task('build:watch', ['tsCompile', 'sass', 'ts:watch', 'sass:watch']);
gulp.task('e2e', ['e2eTsCompile']);

// compile typescript
gulp.task('tsCompile', function() {
  return tsProject.src()
    .pipe(tsProject())
    .js.pipe(gulp.dest("src"));
});

gulp.task('e2eTsCompile', ['tsCompile', 'sass'], function() {
  return tsE2ETests.src()
    .pipe(tsE2ETests())
    .js.pipe(gulp.dest("e2e"));
});


gulp.task('sass', function() {
  return gulp.src('src/**/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('src'));
});

gulp.task('sass:watch', function() {
  gulp.watch('./src/**/*.scss', ['sass']);
});

gulp.task('ts:watch', function() {
  gulp.watch('./src/**/*.ts', ['tsCompile']);
});




gulp.task('cleanNodeModules', function() {
  console.log('cleanNodeModules');
  return del.sync([distDir + 'node_modules/**/*']);
});

gulp.task('cleanBackend', function() {
  let sources = [
    backendDir + '**/*',
    // we don't want to clean this file though so we negate the pattern
    '!' + backendDir + 'node_modules/'
  ];
  console.log('cleanBackend', sources);
  return del.sync(sources);
});

gulp.task('cleanFrontend', function() {
  let sources = [
    frontendDir + '**/*',
    // we don't want to clean this file though so we negate the pattern
    '!' + frontendDir + 'node_modules/'
  ];
  console.log('cleanFrontend', sources);
  return del.sync(sources);

});
gulp.task('clean', ['cleanFrontend', 'cleanBackend', 'cleanNodeModules']);


gulp.task('copyNodeModules', function() {
  gulp.src([
    './node_modules/**/*'
  ]).pipe(gulp.dest(distDir + 'node_modules/'));
});

gulp.task('copyFrontend', function() {
  gulp.src([
    './src/**/*.js',
    './src/**/*.css',
    './src/**/*.html',
    './src/**/*.json',
    './src/**/*.png',
    './src/**/*.svg',
    './src/**/*.jpg'
  ]).pipe(gulp.dest(distDir));
});

gulp.task('copyBackend', function() {
  gulp.src('server.js').pipe(gulp.dest(distDir));

  gulp.src([
    './backend/**/*'
  ]).pipe(gulp.dest(distDir + 'backend/'));
});

gulp.task('copyToServer', function() {
  gulp.src([
    distDir + '**/*',
  ]).pipe(gulp.dest(serverDir))
});

gulp.task('deployRelease', ['clean', 'copyFrontend', 'copyBackend', 'copyNodeModules', 'copyToServer']);
gulp.task('quickDistro', ['cleanFrontend', 'cleanBackend', 'copyBackend', 'copyFrontend']);

// distribute all the things
gulp.task('fullDistro', ['copyBackend', 'copyNodeModules', 'copyFrontend']);
gulp.task('deploy', ['default', 'fullDistro']);
gulp.task('quickDeploy', ['default', 'quickDistro']);
