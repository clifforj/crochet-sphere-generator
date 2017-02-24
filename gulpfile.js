var gulp = require('gulp');

var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var merge =  require('merge-stream');
var shell = require('gulp-shell');
var cleanCss = require('gulp-clean-css');
var html2js = require('gulp-html2js');
var Server = require('karma').Server;

var jsDependencies = [
    'node_modules/angular/angular.min.js'
];

var cssDependencies = [
    'node_modules/normalize.css/normalize.css'
];

gulp.task('test', function (done) {
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: false
    }, done).start();
});

gulp.task('test-once', function (done) {
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done).start();
});

gulp.task('coveralls', ['test-once'], function() {
    return gulp.src('gulpfile.js', { read: false })
        .pipe(shell('cat coverage/lcov.info | node_modules/coveralls/bin/coveralls.js'));
});

gulp.task('lint', function() {
    return gulp.src('src/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('js', function() {
    return gulp.src(['src/csg.module.js', 'src/**/*.js', '!src/**/*.spec.js'])
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/assets/js'));
});

gulp.task('css', function() {
    return gulp.src(['src/**/*.css'])
        .pipe(concat('app.min.css'))
        .pipe(cleanCss())
        .pipe(gulp.dest('dist/assets/css'));
});

gulp.task('html', function() {
   return gulp.src('src/index.html')
       .pipe(gulp.dest('dist'));
});

gulp.task('templates', function() {
    return gulp.src(['src/**/*.html', '!src/index.html'])
        .pipe(html2js('app-templates.min.js', {
            adapter: 'angular',
            base: 'src',
            name: 'csg'
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/assets/js'));
});


gulp.task('dependencies', function() {
    var js = gulp.src(jsDependencies)
        .pipe(concat('ext.min.js'))
        .pipe(gulp.dest('dist/assets/js'));

    var css =  gulp.src(cssDependencies)
        .pipe(concat('ext.min.css'))
        .pipe(gulp.dest('dist/assets/css'));
    return merge(js, css);
});

gulp.task('watch', function() {
    gulp.watch('src/**/*.js', {cwd:'./'}, ['lint', 'js']);
    gulp.watch('src/**/*.css', {cwd:'./'}, ['css']);
    gulp.watch('src/index.html', {cwd:'./'}, ['html']);
});

gulp.task('build-app', ['dependencies', 'lint', 'js', 'css', 'html', 'templates']);

gulp.task('default', ['build-app', 'watch']);
gulp.task('build', ['build-app', 'coveralls']);