var gulp = require('gulp');
// var typescript = require('gulp-tsc');
var ts = require("gulp-typescript");
var tsProject = ts.createProject("src/tsconfig.json");
var tsE2ETests = ts.createProject("e2e/tsconfig.json");
// main task
gulp.task('default', ['tsCompile']);
gulp.task('e2e', ['e2eTsCompile']);

// compile typescript
gulp.task('tsCompile', function(){
  return tsProject.src()
    .pipe(tsProject())
    .js.pipe(gulp.dest("src"));
})

gulp.task('e2eTsCompile', ['tsCompile'], function(){
  return tsE2ETests.src()
    .pipe(tsE2ETests())
    .js.pipe(gulp.dest("e2e"));
})
