// Modules & Plugins
var gulp = require('gulp');
var concat = require('gulp-concat');
var myth = require('gulp-myth');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');

gulp.task('clean', function () {
    return gulp.src(['sales-client/lib/css', 'sales-client/lib/fonts', 'sales-client/lib/temp', 'sales-client/lib/js'], {
        read: false
    }).pipe(clean());
});

gulp.task('move-css', function () {
    return gulp.src(['node_modules/bootstrap/dist/css/*.min.css*']).pipe(gulp.dest('sales-client/lib/css'));
});

gulp.task('move-css-dev', function () {
    return gulp.src(['dev/css/*.css']).pipe(gulp.dest('sales-client/lib/css'));
});

gulp.task('move-fonts', function () {
    return gulp.src('node_modules/bootstrap/dist/fonts/**.*').pipe(gulp.dest('sales-client/lib/fonts'));
});

gulp.task('move-js', function () {
    return gulp.src(
        ['node_modules/bootstrap/dist/js/*.min.js', 
         'node_modules/jquery/dist/*.min.js', 
         'node_modules/angular/*.min.js',
         'node_modules/angular-resource/*.min.js',
         'node_modules/angular-route/*.min.js'
        ]).pipe(gulp.dest('sales-client/lib/js'));
});

/*gulp.task('scripts', function () {
    var b = gulp.src('sales-client/lib/temp/js/*.min.js')
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('sales-client/lib/js'));

    var d = gulp.src('sales-client/lib/temp', {
        read: false
    }).pipe(clean());

return [b, d];
});*/

gulp.task('default', function () {
    runSequence('clean', ['move-css', 'move-css-dev', 'move-fonts', 'move-js']);
});

// Styles Task
/*gulp.task('styles', function () {
    gulp.src('app/css/*.css')
        .pipe(concat('all.css'))
        .pipe(gulp.dest('dist'));
});

// Scripts Task
gulp.task('scripts', function () {
    gulp.src('app/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});
*/
