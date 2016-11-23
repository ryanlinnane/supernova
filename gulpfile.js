/**
 * Created by MagicAntler on 10/14/15.
 */
var gulp = require('gulp');
var shell = require('gulp-shell');
var clean = require('gulp-clean');



gulp.task('default',['dev'], function(){//will run on port 8080

});

gulp.task('clean', function(){
  gulp.src(["dist/public", "dist/index.html", "dist/package.json", "dist/server.js"]).pipe(clean());
  return;
});
//todo: only clean certain files.. leave dist and .git

gulp.task('copy', function(){
  //will overwrite changes in dist folder.
  gulp.src(['src/public/**/*']).pipe(gulp.dest('dist/public/'));
  gulp.src('src/server/*').pipe(gulp.dest('dist'));
  gulp.src('src/index.html').pipe(gulp.dest('dist'));
});

//./node_modules/webpack-dev-server/bin/webpack-dev-server.js --content-base dist --hot
gulp.task('dev',['copy'], shell.task([
    "./node_modules/webpack-dev-server/bin/webpack-dev-server.js --content-base dist --hot"
]));

gulp.task('deploy',['copy'], shell.task([
  "NODE_ENV=production webpack -p --config webpack.production.config.js"
]));
