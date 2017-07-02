var gulp = require('gulp');
// var typescript = require('gulp-tsc');
var ts = require("gulp-typescript");
var sass = require('gulp-sass');
var tsProject = ts.createProject("src/tsconfig.json");
var tsE2ETests = ts.createProject("e2e/tsconfig.json");

var spawn = require('child_process').spawn;

gulp.task('serve', function() {
  spawn('node', ['app.js'], { stdio: 'inherit' });
});


// main task
gulp.task('default', ['tsCompile', 'sass','serve']);
gulp.task('e2e', ['e2eTsCompile']);

// compile typescript
gulp.task('tsCompile', function(){
  return tsProject.src()
    .pipe(tsProject())
    .js.pipe(gulp.dest("src"));
})

gulp.task('e2eTsCompile', ['tsCompile', 'sass'], function(){
  return tsE2ETests.src()
    .pipe(tsE2ETests())
    .js.pipe(gulp.dest("e2e"));
})


gulp.task('sass', function () {
  return gulp.src('src/**/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('src'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./src/**/*.scss', ['sass']);
});
