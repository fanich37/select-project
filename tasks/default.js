const runSequence = require('run-sequence');
const gulp = require('gulp');

gulp.task('default', () => (
	runSequence(
		'styles',
		'scripts',
		'server',
		'watch'
	)
));