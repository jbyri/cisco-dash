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
    .pipe(gulp.dest('src')).on('end', function() {
      cb();
    });
}
/**
 * Compile SCSS Files to css
 */
gulp.task(sass);

/**
 * Cleans the node_modules directory
 */
function cleanNodeModules(cb) {
  var promise = Promise.resolve(del(distDir + 'node_modules/**/*.js'));
  promise.then(function() {
    console.log("Cleaned node_modules from " + distDir);
    cb();
  });

  return promise;
}
gulp.task(cleanNodeModules);

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
  var promise = Promise.resolve(del(distDir + 'app/**/*.json'));
  promise.then(function() {
    return gulp.src(appSrcDir + '**/*.json')
    .pipe(jsonminify())
    .pipe(gulp.dest(distDir))
    .on('end', function() {
      console.log("Finished minify + compression of JSON documents in " + appSrcDir);
      cb();
    });
  });

  return promise;
}
/**
 * Compress and minify JSON and move to dist folder
 */
gulp.task(compressAndCopyJSON);

function compressAndCopyCSS(cb) {
  var promise = Promise.resolve(del(distDir + "app/**/*.css"));
  promise.then(function(){
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

  return promise;
}

/**
 * Compress and uglify CSS and move to dist folder
 */
gulp.task(compressAndCopyCSS);

function compressAndCopyFrontendJS(cb) {
  var promise = Promise.resolve(del(distDir + "app/**/*.js"));
  promise.then(function(){
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

  return promise;

}

gulp.task(compressAndCopyFrontendJS);

function copyStaticJavascript(cb) {
  var promise = Promise.resolve(del(distDir + '/app/assets/javascripts'));
  promise.then(function(){
    console.log("Finished cleaning old static javascripts in " + distDir);

    gulp.src([appSrcDir + 'app/assets/javascripts/**/*.js'])
    .pipe(uglify())
    .pipe(gulp.dest(distDir + '/app/assets/javascripts/'))
    .on('end', function() {
      console.log("Finished compressing and moving frontend static scripts in " + appSrcDir + "/app/assets/javascripts/ to " + distDir + "app/assets/javascripts/");
      cb();
    });
  });

  return promise;
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
  var promise = Promise.resolve(del(distDir + 'server.js'));
  promise.then(function() {
    gulp.src('server.js')
    .pipe(gulp.dest(distDir)).on('end', function() {
      console.log("copying server files");
      cb();
    });
  });

  return promise;
}
gulp.task(copyServerFile);


function copyBackend(cb) {
  // backend server code is segregated into the backend dir.
  result = gulp.src(serverSrcDir + '**/*.js')
               .pipe(gulp.dest(distDir + backendDir))
               .on('end', function() { cb(); });

  return result;
}

gulp.task(copyBackend);
gulp.task('copyBackendJs', gulp.parallel('copyServerFile', 'copyBackend'));

/**
* Copy node modules to distribution dir
*/
function copyNodeModules(cb) {
  var promise = Promise.resolve(cleanNodeModules(cb));

  promise.then(function(){
    console.log("Finished removing old node modules, js from " + distDir + 'node_modules/');
    gulp.src('./node_modules/**/*.js')
         .pipe(gulp.dest(distDir + 'node_modules/'))
         .on('end', function() {
          console.log("Copied all node_modules js files to ", distDir + 'node_modules/');
          cb();
         });
  });

  return promise;
}
gulp.task(copyNodeModules);

/**
 * clean all files currently in http root
 * so we can 'overwrite' them with new ones.
 */
function cleanServer() {
  return Promise.all([
    del([httpRootDir + '**/*'], { force: true })
  ]);
}

function doCopyToServer(cb) {
  var promise = Promise.resolve(cleanServer(cb));

  promise.then(function() {
    console.log("Finished cleaning old server files in: " + httpRootDir);

    gulp.src([
      distDir + '**/*',
    ])
    .pipe(gulp.dest(httpRootDir))
    .on('end', function() {
      console.log("Copied all files from the distribution at: " + distDir + " to the server directory at: " + httpRootDir);
      cb();
    });
  });

  return promise;
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



gulp.task('build', gulp.parallel('tsCompile', 'sass'));
gulp.task('e2eTsCompile', gulp.parallel('sass', 'tsCompile'));
gulp.task('watch', gulp.parallel('watchCss', 'watchTypeScript', 'watchJSON'));

gulp.task('copyStaticAssets', gulp.series('doCopyStaticAssets', 'copyStaticJavascript'));

/**
 * Compress (js, css, json) and copy all static assets to dist directory.
 */
gulp.task('copyAssets', gulp.parallel('compressAndCopyCSS', 'compressAndCopyJavascript', 'compressAndCopyJSON', 'copyStaticAssets'));


/**
 * Watch for SCSS, JS, and Asset Changes
 */
gulp.task('devWatch', gulp.series('build', 'watch'));

// clean, build and redistribute everything (run copyToServer after this to deploy)
gulp.task('fullDistro', gulp.series('build',gulp.parallel('copyAssets', 'copyNodeModules')));

gulp.task(doCopyToServer);

function copyStartScriptsToServer(cb) {
  var promise = Promise.resolve(del(httpRootDir + '*.sh')).then(function(){
    console.log("Finished clearing old start scripts from " + httpRootDir);
    gulp.src('*.sh').pipe(gulp.dest(httpRootDir)).on('end', function(){
      console.log("Finsihed copying start scripts to " + httpRootDir);
      cb();
    });
  });
}

gulp.task(copyStartScriptsToServer);

// copy all files from the distribution directory
// to www root. Run this only on the Amazon Server.
gulp.task('copyToServer', gulp.series('doCopyToServer', 'copyStartScriptsToServer'));

// cleans only OUR code and assets (not node_modules)
gulp.task('quickDistro', gulp.series('build', 'copyAssets'));

// This cleans and copies EVERYTHING to Http Root
gulp.task('deployRelease', gulp.series('fullDistro', 'copyToServer'));
