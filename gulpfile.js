var gulp                 = require('gulp');
var fs                   = require('fs');
var jade                 = require('gulp-jade');
var prettify             = require('gulp-prettify');
var sass                 = require('gulp-sass');
var csso                 = require('gulp-csso');
var perfectionist        = require('perfectionist');
var postcss              = require('gulp-postcss');
var postcssPseudoContent = require('postcss-pseudo-elements-content');
var rucksack             = require('rucksack-css');
var pxtorem              = require('postcss-pxtorem');
var selector             = require('postcss-custom-selectors');
var mqpacker             = require("css-mqpacker");
var babel                = require('gulp-babel');
var browserSync          = require('browser-sync');
var reload               = browserSync.reload;
var less                 = require('gulp-less');
var imagemin             = require('gulp-imagemin');

var postCSSFocus = function (css) {
    css.walkRules(function (rule) {
        if (rule.selector.indexOf(':hover') !== -1) {
            var focuses = [];
            rule.selectors.forEach(function (selector) {
                if (selector.indexOf(':hover') !== -1) {
                    focuses.push(selector.replace(/:hover/g, ':focus'));
                }
            });
            if (focuses.length) {
                rule.selectors = rule.selectors.concat(focuses);
            }
        }

        if (rule.selector.indexOf(':only-hover') !== -1) {
            var hovered = [];
            rule.selectors.forEach(function (selector) {
                if (selector.indexOf(':only-hover') !== -1) {
                    hovered.push(selector.replace(/:only-hover/g, ':hover'));
                }
            });
            if (hovered.length) {
                rule.selectors = hovered;
            }
        }
    });
};

var PROCESSORS = [
    // autoprefixer({browsers: ['ie >= 8', 'last 3 versions', '> 2%']}),
    pxtorem({
        root_value: 14,
        selector_black_list: ['html']
    }),
    rucksack({
        fallbacks: false,
        autoprefixer: true
    }),
    postcssPseudoContent,
    mqpacker,
    selector,
    postCSSFocus
];

var PERFECTIONIST_CONFIG = {
    maxValueLength: false,
    maxAtRuleLength: false,
    maxSelectorLength: true
};

gulp.task('less', function () {
    return gulp.src('./less/bootstrap.less')
        .pipe(less())
        //.pipe(csso())
        .pipe(postcss([perfectionist(PERFECTIONIST_CONFIG)]))
        .pipe(gulp.dest('./app/css'));
});

gulp.task('imagemin', function () {
    return gulp.src('./images/*')
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest('app/img/'));
});

gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: "./app/"
        },
        open: false
    });
});

gulp.task('reload', function () {
    browserSync.reload();
});

gulp.task('jade', function () {

    var dataJSON = JSON.parse(fs.readFileSync('./json/config.json', 'utf-8'));
    gulp.src('./jade/!(_)*.jade')

        .pipe(jade({
            locals: dataJSON,
            pretty: true
        }))

        .pipe(prettify({indent_size: 4}))
        .on('error', console.log)
        .pipe(gulp.dest('./app/'))
        .pipe(reload({stream: true}));
});

gulp.task('sass', function () {
    gulp.src(['./scss/**/*.scss'])

        .pipe(sass({
            outputStyle: 'nested',
            errLogToConsole: true
        }))

        .pipe(postcss(PROCESSORS))
        .pipe(csso())
        .pipe(postcss([perfectionist(PERFECTIONIST_CONFIG)]))
        .pipe(gulp.dest('./app/css'))
        .pipe(reload({stream: true}))
});

gulp.task('babel', function () {
    return gulp.src(['./babel/**/*.js'])
        .pipe(babel({
            comments: false
        }))
        .pipe(gulp.dest('./app/js/'))
        .pipe(reload({stream: true}));
});

gulp.task('default', ['sass', 'imagemin', 'less', 'babel', 'jade', 'browser-sync'], function () {
    gulp.watch('scss/**/*.scss', ['sass']);
    gulp.watch('less/**/*.less', ['less']);
    gulp.watch('babel/**/*.js', ['babel']);
    gulp.watch(['images/*.jpg', 'images/*.png'], ['imagemin']);
    gulp.watch(['jade/**/*.jade', 'json/**/*.json'], ['jade']);
});
