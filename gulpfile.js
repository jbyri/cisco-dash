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
const notify = require('gulp-notify');
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
function tsCompile(cb) {
  return tsProject.src()
    .pipe(tsProject())
    .js.pipe(gulp.dest("src")).on('end', function() {
      console.log("Finished compiling and converting Typescript to Javascript");
      cb();
    });
}

gulp.task(tsCompile);

/**
* End-to-end testing Compilation
*/
function doE2eTsCompile() {
  return tsE2ETests.src()
    .pipe(tsE2ETests())
    .js.pipe(gulp.dest("e2e"));
}
gulp.task(doE2eTsCompile);

function sass(cb) {
  return gulp.src(appSrcDir + '**/*.scss')
    .pipe(gulpSass.sync().on('error', gulpSass.logError))
    .pipe(gulp.dest(appSrcDir))
    .on('end', function() {
      cb();
    });
}

/**
 * Compile SCSS Files to css
 */
gulp.task(sass);

function cleanOurCode() {
  let sources = [
    distDir + '**/*.{js,css,png,html,png,svg,jpg,ico}',
    // we don't want to clean this file though so we negate the pattern
    '!' + distDir,
    '!' + distDir + 'node_modules/**/*'
  ];
  return Promise.resolve(del(sources));
}

/**
 * Cleans only Our code (Skips node_modules)
 */
gulp.task(cleanOurCode);

function compressAndCopyJSON(cb) {
  return Promise.resolve(del(distDir + 'app/**/*.json'));
  promise.then(function() {
    return gulp.src(appSrcDir + '**/*.json')
    .pipe(jsonminify())
    .pipe(gulp.dest(distDir))
    .on('end', function() {
      console.log("Finished minify + compression of JSON documents in " + appSrcDir);
      cb();
    });
  }, function(err) {
    console.log("Error", err);
  });
}
/**
 * Compress and minify JSON and move to dist folder
 */
gulp.task(compressAndCopyJSON);

function compressAndCopyCSS(cb) {
   return Promise.resolve(del(distDir + "app/**/*.css")).then(function(){
      gulp.src(appSrcDir + '**/*.css')
          .pipe(uglifycss({
            "maxLineLen": 80,
            "uglyComments": true
          }))
          .pipe(gulp.dest(distDir))
          .on('end', function() {
            console.log("Completed moving and compressing all css files in :" + distDir);
            cb();
          });
  });
}

/**
 * Compress and uglify CSS and move to dist folder
 */
gulp.task(compressAndCopyCSS);

function compressAndCopyFrontendJS(cb) {
  return Promise.resolve(del(distDir + "**/*.js")).then(function(){
    console.log("cleaned old js files in ", distDir + 'app/');
    // all app js and main server.js go in root of distro folder
    gulp.src([appSrcDir + '**/*.js'])
    .pipe(uglify())
    .pipe(gulp.dest(distDir))
    .on('end', function() {
      console.log("Finsihed compressing and moving all JS files in " + appSrcDir + " to :" + distDir);
      cb();
    });
  });
}

gulp.task(compressAndCopyFrontendJS);

function copyStaticJavascript(cb) {
  var subDir = 'app/assets/javascripts/';

  return  Promise.resolve(del(distDir + subDir)).then(function(){
    console.log("Finished cleaning old static javascripts in " + distDir);

    gulp.src([appSrcDir + subDir + '**/*.js'])
    .pipe(uglify())
    .pipe(gulp.dest(distDir + subDir))
    .on('end', function() {
      console.log("Finished compressing and moving frontend static scripts in " + appSrcDir + subDir + " to " + distDir + subDir);
      cb();
    });
  });
}
gulp.task(copyStaticJavascript);

function doCopyStaticAssets(cb) {
  return Promise.resolve(del(distDir + '**/*.{html,json,svg,ico,png,jpg}')).then(function() {
    console.log("cleaned old static assets from " + appSrcDir);

    gulp.src([appSrcDir + '**/*.{html,json,svg,ico,png,jpg}'])
    .pipe(gulp.dest(distDir))
    .on('end', function() {
      console.log("all static assets copied from " + appSrcDir);
      cb();
    });
  });
}

gulp.task(doCopyStaticAssets);

function copyServerFile(cb) {
  return Promise.resolve(del(distDir + 'server.js')).then(function() {
    gulp.src('server.js')
    .pipe(gulp.dest(distDir))
    .on('end', function() {
      console.log("copying server files");
      cb();
    });
  });
}
gulp.task(copyServerFile);

function copyBackend(cb) {
  // backend server code is segregated into the backend dir.
  return gulp.src(serverSrcDir + '**/*.js')
               .pipe(gulp.dest(distDir + backendDir))
               .on('end', function() { cb(); });
}

gulp.task(copyBackend);
gulp.task('copyBackendJs', gulp.series('copyServerFile', 'copyBackend'));



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

/**
 * Compress and uglify Javascripts and move to dist folder
 */
gulp.task('compressAndCopyJavascript', gulp.series('compressAndCopyFrontendJS', 'copyBackendJs'));
gulp.task('build', gulp.series('tsCompile', 'sass'));
gulp.task('e2eTsCompile', gulp.series('sass', 'tsCompile'));
gulp.task('watch', gulp.parallel('watchCss', 'watchTypeScript', 'watchJSON'));
gulp.task('copyStaticAssets', gulp.series('doCopyStaticAssets', 'copyStaticJavascript'));

/**
 * Compress (js, css, json) and copy all static assets to dist directory.
 */
gulp.task('copyAssets', gulp.series('compressAndCopyCSS', 'compressAndCopyJavascript', 'compressAndCopyJSON', 'copyStaticAssets'));


/**
 * Watch for SCSS, JS, and Asset Changes
 */
gulp.task('devWatch', gulp.series('build', 'watch'));

// clean, build and redistribute everything (run copyToServer after this to deploy)

function copyScripts(cb) {
  var promise = Promise.resolve(del(distDir + '*.{json,bat,sh}')).then(function(){
    console.log("Finished clearing old start scripts from " + httpRootDir);
    gulp.src('*.{json,bat,sh}').pipe(gulp.dest(distDir)).on('end', function(){
      console.log("copyScripts: Finsihed copying start scripts to " + httpRootDir);
      cb();
    });
  });

  return promise;
}

gulp.task(copyScripts);

// This cleans and copies EVERYTHING to Http Root
gulp.task('deployRelease', gulp.series('build','copyAssets', 'copyScripts'));
