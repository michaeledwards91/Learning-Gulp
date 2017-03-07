
// Require modules
var gulp = require("gulp");
var uglify = require("gulp-uglify");
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var rename = require("gulp-rename");
var plumber = require("gulp-plumber"); //.pipe(plumber()) must go right after gulp.src
var autoprefixer = require("gulp-autoprefixer");
var compass = require("gulp-compass");

// Scripts
gulp.task('scripts', function() {
	gulp.src(['app/js/**/*.js', '!app/js/**/*min.js'])
		.pipe(plumber())
		.pipe(rename({suffix:'.min'}))
		.pipe(uglify())
		.pipe(gulp.dest('app/js'));
});

// Compass / Sass Tasks
gulp.task('compass', function() {
	gulp.src('app/scss/style.scss')
		.pipe(plumber())
		.pipe(compass({
			config_file: '/config.rb',
			css: 'app/css',
			sass: 'app/scss',
			require: ['susy']
		}))
		.pipe(autoprefixer('last 2 versions'))
		.pipe(gulp.dest('app/css/'))
		.pipe(reload({stream:true}));
});

// HTML Tasks
gulp.task('html', function() {
	gulp.src('app/**/*.html');
});

// Browser-Sync Tasks
gulp.task('browser-sync', function() {
	browserSync({
		server:{
			baseDir: "./app/"
		}
	});
});

// Watch Tasks
gulp.task('watch', function() {
	gulp.watch('app/js/**/*.js', ['scripts']);
	gulp.watch('app/scss/**/*.scss', ['compass']);
	gulp.watch('app/**/*.html', ['html']);
});

// Default Task
gulp.task('default', ['scripts', 'compass', 'html', 'browser-sync', 'watch']);