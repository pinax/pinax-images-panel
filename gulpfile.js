'use strict';

var babel = require('gulp-babel');
var del = require('del');
var cleanCSS = require('gulp-clean-css');
var concatCSS = require('gulp-concat-css');
var derequire = require('gulp-derequire');
var flatten = require('gulp-flatten');
var gulp = require('gulp');
var gulpUtil = require('gulp-util');
var header = require('gulp-header');
var packageData = require('./package.json');
var runSequence = require('run-sequence');
var through = require('through2');
var webpackStream = require('webpack-stream');

var paths = {
  dist: 'dist',
  lib: 'lib',
  src: [
    'src/**/*.js',
    '!src/**/__tests__/**/*.js',
    '!src/**/__mocks__/**/*.js',
  ],
  css: [
    'src/**/*.css',
  ],
};

var COPYRIGHT_HEADER = `/**
 * Pinax Images Panel v<%= version %>
 *
 * Copyright (c) 2016-present, James Tauber and Contributors.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license.
 */
`;

var buildDist = function(opts) {
  var webpackOpts = {
    debug: opts.debug,
    externals: {
      immutable: 'Immutable',
      react: 'React',
      'react-dom': 'ReactDOM',
    },
    output: {
      filename: opts.output,
      libraryTarget: 'var',
      library: 'ImagePanel',
    },
    plugins: [
      new webpackStream.webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(
          opts.debug ? 'development' : 'production'
        ),
      }),
      new webpackStream.webpack.optimize.OccurenceOrderPlugin(),
      new webpackStream.webpack.optimize.DedupePlugin(),
    ],
  };
  if (!opts.debug) {
    webpackOpts.plugins.push(
      new webpackStream.webpack.optimize.UglifyJsPlugin({
        compress: {
          hoist_vars: true,
          screw_ie8: true,
          warnings: false,
        },
      })
    );
  }
  return webpackStream(webpackOpts, null, function(err, stats) {
    if (err) {
      throw new gulpUtil.PluginError('webpack', err);
    }
    if (stats.compilation.errors.length) {
      gulpUtil.log('webpack', '\n' + stats.toString({colors: true}));
    }
  });
};

gulp.task('clean', function() {
  return del([paths.dist, paths.lib]);
});

gulp.task('modules', function() {
  return gulp
    .src(paths.src)
    .pipe(babel())
    .pipe(gulp.dest(paths.lib));
});

gulp.task('dist', ['modules'], function() {
  var opts = {
    debug: true,
    output: 'ImagePanel.js',
  };
  return gulp.src('./lib/index.js')
    .pipe(buildDist(opts))
    .pipe(derequire())
    .pipe(header(COPYRIGHT_HEADER, {version: packageData.version}))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('dist:min', ['modules'], function() {
  var opts = {
    debug: false,
    output: 'ImagePanel.min.js',
  };
  return gulp.src('./lib/index.js')
    .pipe(buildDist(opts))
    .pipe(header(COPYRIGHT_HEADER, {version: packageData.version}))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('watch', function() {
  gulp.watch(paths.src, ['modules']);
});

gulp.task('dev', function() {
  gulp.watch(paths.src, ['modules', 'dist']);
});

gulp.task('default', function(cb) {
  runSequence('clean', 'modules', ['dist', 'dist:min'], cb);
});
