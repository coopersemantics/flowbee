var path = require('path');
var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var eslint = require('gulp-eslint');
var conventionalChangelog = require('gulp-conventional-changelog');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var header = require('gulp-header');
var Server = require('karma').Server;
var del = require('del');
var version = require('./package').version;

var basePath = path.resolve(__dirname, '.');
var libPath = path.join(basePath, 'lib');

var glob = {
	all: ['*.js', path.join(libPath, '**', '*.js')],
	lib: [path.join(libPath, '**', '*.js')],
	docs: [path.join(libPath, '**', '!(flowbee).js')],
	app: [path.join(libPath, 'flowbee.js')]
};

var banner = ['/*',
	' * flowbee v<%= version %>',
	' * Copyright 2016 coopersemantics',
	' * Available under MIT license <https://github.com/coopersemantics/flowbee/blob/master/LICENSE>',
	' */',
	''].join('\n');

// Linting.
gulp.task('lint', function() {
	return gulp.src(glob.all)
		.pipe(eslint())
		.pipe(eslint.format());
});

// Functional tests (unit).
gulp.task('unit', function(done) {
	del.sync('./coverage/**');

	return new Server({
		configFile: path.join(basePath, 'karma.conf.js'),
		singleRun: true
	}, done).start();
});

// Build `build` dir/files.
gulp.task('build', function () {
	del.sync('./build/**');

	return browserify({
		entries: glob.app,
		standalone: 'flowbee',
		debug: true
	})
		.transform(babelify)
		.bundle()
		.on('error', console.error.bind(console))
		.pipe(source('flowbee.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init())
		.pipe(uglify())
		.pipe(header(banner, {
			version: version,
			date: new Date()
		}))
		.pipe(rename('flowbee.js'))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./dist'))
		.on('finish', console.log.bind(console, '`build` task complete'));
});

// `CHANGELOG.md` creation.
gulp.task('changelog', function () {
	return gulp.src('CHANGELOG.md', {
		buffer: false
	})
		.pipe(conventionalChangelog({
			preset: 'eslint'
		}))
		.pipe(gulp.dest('./'));
});

// Run the `test` task, when a file changes.
gulp.task('watch', function() {
	return gulp.watch(glob.lib, ['test']);
});

gulp.task('test', ['lint', 'unit']);
gulp.task('release', ['build', 'changelog']);
gulp.task('default', ['watch']);
