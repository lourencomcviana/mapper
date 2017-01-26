var gulp  = require('gulp')
var shell = require('gulp-shell')
 


 gulp.task('exe', shell.task([
  'tsc',
  'node dist/index.js'
  //,'browserify main.js -o mapper.js'
]))

/*
gulp.task('example', function () {
  return gulp.src('*.js', {read: false})
    .pipe(shell([
      'tsc index.ts',
      'node index.js'
    ], {
      templateData: {
        f: function (s) {
          return s.replace(/$/, '.bak')
        }
      }
    }))
})

*/