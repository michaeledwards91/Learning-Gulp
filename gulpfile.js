
// Require modules
var gulp = require("gulp");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");

// Scripts
gulp.task('scripts', function() {
	gulp.src(['app/js/**/*.js', '!app/js/**/*min.js'])
	.pipe(rename({suffix:'.min'}))
	.pipe(uglify())
	.pipe(gulp.dest('app/js'));
});

// Default Task
gulp.task('default', ['scripts']);