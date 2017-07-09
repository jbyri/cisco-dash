// jshint esversion: 6
// ES Modules
const gulp = require('gulp');
const ts = require("gulp-typescript");
const gulpSass = require('gulp-sass');
const gulpClean = require('gulp-clean');
const uglify = require('gulp-uglify');
const uglifycss = require('gulp-uglifycss');
const jsonminify = require('gulp-jsonminify');
const pump = require('pump');
const del = require("del");

// locations
const backendDir = 'backend/';
const appSrcDir = './src/';
const serverSrcDir = './' + backendDir;
const distDir = './dist/';

const httpRootDir = '/var/www/html/';

// TypeScript compilation projects.
var tsProject = ts.createProject(appSrcDir + "tsconfig.json");
var tsE2ETests = ts.createProject("e2e/tsconfig.json");

function e2e() {
  e2eTsCompile();
}
e2e.description = "Run End to End tests";
gulp.task(e2e, ['e2eTsCompile']);


/**
 * Typescript Compilation
 */
function tsCompile() {
  return tsProject.src()
    .pipe(tsProject())
    .js.pipe(gulp.dest("src"));
}

gulp.task(tsCompile);


function e2eTsCompile() {
  tsCompile();
  sass();
  return tsE2ETests.src()
    .pipe(tsE2ETests())
    .js.pipe(gulp.dest("e2e"));
}

/**
 * End-to-end testing Compilation
 */
gulp.task(e2eTsCompile);

function sass() {
  return gulp.src(appSrcDir + '**/*.scss')
    .pipe(gulpSass.sync().on('error', gulpSass.logError))
    .pipe(gulp.dest('src'));
}
/**
 * Compile SCSS Files to css
 */
gulp.task(sass);

/**
 * Cleans the node_modules directory
 */
function cleanNodeModules() {
  return Promise.all(del([distDir + 'node_modules/**/*']));
}
gulp.task(cleanNodeModules);

function cleanOurCode() {
  let sources = [
    distDir + '**/*.{js,css,png,html,png,svg,jpg,ico}',
    // we don't want to clean this file though so we negate the pattern
    '!' + distDir,
    '!' + distDir + 'node_modules/**/*'
  ];
  return Promise.all(del(sources));
}
/**
 * Cleans only Our code (Skips node_modules)
 */
gulp.task(cleanOurCode);

function compressAndCopyJSON(cb) {
  gulp.src(appSrcDir + '**/*.json')
    .pipe(jsonminify())
    .pipe(gulp.dest(distDir));

  cb();
}
/**
 * Compress and minify JSON and move to dist folder
 */
gulp.task(compressAndCopyJSON);

function compressAndCopyCSS(cb) {
  gulp.src(appSrcDir + '**/*.css')
    .pipe(uglifycss({
      "maxLineLen": 80,
      "uglyComments": true
    }))
    .pipe(gulp.dest(distDir));

  cb();
}
/**
 * Compress and uglify CSS and move to dist folder
 */
gulp.task(compressAndCopyCSS);

function compressAndCopyFrontendJS(cb) {
  // all app js and main server.js go in root of distro folder
  gulp.src([appSrcDir + '**/*.js'])
             .pipe(uglify())
             .pipe(gulp.dest(distDir));

  cb();
}

gulp.task(compressAndCopyFrontendJS);


function copyStaticAssets(cb) {
  gulp.src([appSrcDir + '**/*.{html,json,svg,ico,png,jpg}']).pipe(gulp.dest(distDir));
  gulp.src([appSrcDir + '/app/assets/javascripts/**/*.js']).pipe(gulp.dest(distDir + '/app/assets/javascripts/'));
  cb();
}

gulp.task(copyStaticAssets);

function copyBackendJs(cb) {
  gulp.src('server.js').pipe(gulp.dest(distDir));

  // backend server code is segregated into the backend dir.
  gulp.src(serverSrcDir + '**/*.js').pipe(gulp.dest(distDir + backendDir));

  cb();
}

gulp.task(copyBackendJs);

/**
* Copy node modules to distribution dir
*/
function copyNodeModules(cb) {
  gulp.src([
    './node_modules/**/*'
  ]).pipe(gulp.dest(distDir + 'node_modules/'));

  cb();
}
gulp.task(copyNodeModules);

/**
 * clean all files currently in http root
 * so we can 'overwrite' them with new ones.
 */
function cleanServer() {
  return Promise.all(
    del([httpRootDir + '**/*'], {force:true})
  );
}

function doCopyToServer(cb) {
  gulp.src([
    distDir + '**/*',
  ]).pipe(gulp.dest(httpRootDir));

  cb();
}
function watchCss(){
  return gulp.watch([
      appSrcDir + '**/*.scss'
    ],
    gulp.series('sass'));
}

function watchTypeScript(){
  return gulp.watch(appSrcDir + '**/*.ts', gulp.series('tsCompile'));
}

function watchJSON() {
  return gulp.watch(appSrcDir + '**/*.{json}', gulp.series('sass'));
}

gulp.task(watchCss);
gulp.task(watchTypeScript);
gulp.task(watchJSON);
gulp.task(cleanServer);

/**
 * Compress and uglify Javascripts and move to dist folder
 */
gulp.task('compressAndCopyJavascript', gulp.parallel('compressAndCopyFrontendJS', 'copyBackendJs'));


/**
 * Clean everything
 */
gulp.task('clean', gulp.parallel('cleanOurCode', 'cleanNodeModules'));

gulp.task('build', gulp.parallel('tsCompile', 'sass'));

gulp.task('watch', gulp.parallel('watchCss', 'watchTypeScript', 'watchJSON'));

/**
 * Compress (js, css, json) and copy all static assets to dist directory.
 */
gulp.task('copyAssets', gulp.parallel('compressAndCopyCSS', 'compressAndCopyJavascript', 'compressAndCopyJSON', 'copyStaticAssets'));


/**
 * Watch for SCSS, JS, and Asset Changes
 */
gulp.task('devWatch', gulp.series('build', 'watch'));

// clean, build and redistribute everything (run copyToServer after this to deploy)
gulp.task('fullDistro', gulp.series('clean', 'build', 'copyAssets', 'copyNodeModules'));


gulp.task(doCopyToServer);

function copyStartScriptsToServer() {
  return gulp.src('*.sh').pipe(gulp.dest(httpRootDir));
}

gulp.task(copyStartScriptsToServer);

// copy all files from the distribution directory
// to www root. Run this only on the Amazon Server.
gulp.task('copyToServer', gulp.series('cleanServer', 'doCopyToServer', 'copyStartScriptsToServer'));

// cleans only OUR code and assets (not node_modules)
gulp.task('quickDistro', gulp.series('cleanOurCode', 'build', 'copyAssets'));

// This cleans and copies EVERYTHING to Http Root
gulp.task('deployRelease', gulp.series('fullDistro', 'copyToServer'));
