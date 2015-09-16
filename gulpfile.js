var gulp                 = require('gulp');
var fs                   = require('fs');

// html compile
var jade                 = require('gulp-jade');
var prettify             = require('gulp-html-prettify');

// css compile
var sass                 = require('gulp-sass');
var csso                 = require('gulp-csso');
var perfectionist        = require('perfectionist');

// post css plugin
var postcss              = require('gulp-postcss');
var autoprefixer         = require('autoprefixer');
var postcssPseudoContent = require('postcss-pseudo-elements-content');
var rucksack             = require('rucksack-css');
var pxtorem              = require('postcss-pxtorem');
var selector             = require('postcss-custom-selectors');
var mqpacker             = require("css-mqpacker");

// js compile
var concat               = require('gulp-concat');
var uglify               = require('gulp-uglify');
var babel                = require('gulp-babel');

var browserSync          = require('browser-sync');
var reload               = browserSync.reload;

// less
var less                 = require('gulp-less');

var imagemin             = require('gulp-imagemin');

gulp.task('less', function () {
  return gulp.src('./less/bootstrap.less')
    .pipe(less())
    // .pipe(csso())
    .pipe(gulp.dest('./build/css'));
});

gulp.task('imagemin', function () {
    return gulp.src('./images/*')
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest('build/img/'));
});

var postCSSFocus = function (css, opts) {
    css.walkRules(function (rule) {
        if ( rule.selector.indexOf(':hover') !== -1 ) {
            var focuses = [];
            rule.selectors.forEach(function (selector) {
                if ( selector.indexOf(':hover') !== -1 ) {
                    focuses.push(selector.replace(/:hover/g, ':focus'));
                }
            });
            if ( focuses.length ) {
                rule.selectors = rule.selectors.concat(focuses);
            }
        }

        if ( rule.selector.indexOf(':only-hover') !== -1 ) {
            var hovered = [];
            rule.selectors.forEach(function (selector) {
                if ( selector.indexOf(':only-hover') !== -1 ) {
                    hovered.push(selector.replace(/:only-hover/g, ':hover'));
                }
            });
            if ( hovered.length ) {
                rule.selectors = hovered;
            }
        }
    });
};

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./build/"
        },
        open: false
    });
});

gulp.task('reload', function () {
    browserSync.reload();
});

gulp.task('jade', function(){
    var dataJSON = JSON.parse(fs.readFileSync('./json/config.json', 'utf-8'));

    gulp.src('./jade/!(_)*.jade')

        .pipe(jade({
            locals: dataJSON,
            pretty: true
        }))

        .pipe(prettify({indent_char: '  ', indent_size: 2}))
        .on('error', console.log)
        .pipe(gulp.dest('./build/'))
        .pipe(reload({stream:true}));
});

gulp.task('sass', function () {
    var processors = [
        autoprefixer({browsers: ['ie >= 8', 'last 3 versions', '> 2%']}),
        pxtorem({
            root_value: 14,
            selector_black_list: ['html'],
        }),
        rucksack({
            fallbacks: false,
            autoprefixer: false
        }),
        postcssPseudoContent,
        mqpacker,
        selector,
        postCSSFocus
    ];

    gulp.src(['./scss/**/*.scss'])
        .pipe(sass({
            outputStyle: 'nested',
            errLogToConsole: true
        }))
        .pipe(postcss(processors))
        .pipe(csso())
        .pipe(postcss([perfectionist({
            maxValueLength: false,
            maxAtRuleLength: false,
            maxSelectorLength: true
        })]))
        .pipe(gulp.dest('./build/css'))
        .pipe(reload({stream:true}));
});

gulp.task('uglify', function() {
  return gulp.src('./build/js/app.js')
    .pipe(uglify())
     .pipe(gulp.dest('./build/js/'))
});

gulp.task('concat', function() {
  return gulp.src(
        ['./build/js/jquery.min.js',
        './build/js/bootstrap.min.js',
        './build/js/goodshare.js',
        './build/js/main.js'])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./build/js/'))
});

gulp.task('js', ['concat', 'uglify'])

gulp.task('babel', function() {
  return gulp.src(
        ['./babel/**/*.js'])
    .pipe(babel())
    .pipe(gulp.dest('./build/js/'))
    .pipe(reload({stream:true}));
});

gulp.task('watch', function () {
    gulp.watch('./scss/**/*.scss', ['sass']);
    gulp.watch('./less/**/*.less', ['less']);
    gulp.watch('./babel/**/*.js', ['babel']);
    gulp.watch(['./images/*.jpg', './images/*.png'], ['imagemin']);
    gulp.watch(['./jade/**/*.jade', './json/**/*.json'], ['jade']);
});

gulp.task('default',
    [
        'watch',
        'sass',
        'imagemin',
        'less',
        'babel',
        'jade',
        'browser-sync'
    ]
);
