'use strict';

var gulp = require('gulp'),
  webpack = require('webpack'),
  del = require('del'),
  jshint = require('gulp-jshint'),
  jscs = require('gulp-jscs'),
  webpackConfig = require('./webpack.config.js'),
  gutil = require('gulp-util'),
  nodemon = require('nodemon'),
  _webpack;

/**
 * Style tasks
 */

gulp.task('jshint', function() {
  gulp.src('app/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('jscs', function() {
  gulp.src('app/*.js')
    .pipe(jscs());
});

gulp.task('style', [ 'jshint', 'jscs' ]);

/**
 * Build tasks
 */

_webpack = function(config) {
  
  var compiler = webpack(config);

  return function(next) {

    return compiler.run(function(err, stats) {
      if (err) {
        throw new gutil.PluginError('webpack', err);
      }
      gutil.log('webpack', stats.toString({
        hash: true,
        colors: true,
        cached: false
      }));
      next();
    });

  };
};

gulp.task('build', [ 'style' ], _webpack(webpackConfig));

/**
 * Server
 */

gulp.task('server', [ 'build' ], function() {
  nodemon({
    script: 'server.js',
    ext: 'js'
  });
});

/**
 * Aggregations
 */

gulp.task('watch', function() {
  gulp.watch('app/*.js', [ 'style', 'build' ]);
});

gulp.task('default', [ 'style', 'build', 'watch', 'server' ]);