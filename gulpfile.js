var gulp                 = require('gulp');
var fs                   = require('fs');

// html compile
var jade                 = require('gulp-jade');
var prettify             = require('gulp-html-prettify');

// css compile
var sass                 = require('gulp-sass');
var csso                 = require('gulp-csso');
var csscomb              = require('gulp-csscomb');
var cssbeautify          = require('gulp-cssbeautify');

var postcss              = require('gulp-postcss');
var autoprefixer         = require('autoprefixer-core');
var postcssPseudoContent = require('postcss-pseudo-elements-content');
var rucksack             = require('rucksack-css');
var postcssFocus         = require('postcss-focus');
var pxtorem              = require('postcss-pxtorem');
var selector             = require('postcss-custom-selectors')
var mqpacker             = require("css-mqpacker");

var browserSync          = require('browser-sync');
var reload               = browserSync.reload;

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
            locals: dataJSON
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
            fallbacks: false
        }),
        postcssPseudoContent,
        mqpacker,
        selector,
        postCSSFocus
    ];

    gulp.src(['./scss/style.scss'])
        .pipe(sass({
            outputStyle: 'nested',
            errLogToConsole: true
        }))
        .pipe(postcss(processors))
        .pipe(csso())
        .pipe(cssbeautify())
        .pipe(csscomb())
        .pipe(gulp.dest('./build/css'))
        .pipe(reload({stream:true}));
});

gulp.task('watch', function () {
    gulp.watch('./scss/**/*.scss', ['sass']);
    gulp.watch(['./jade/**/*.jade', './json/**/*.json'], ['jade']);
});

gulp.task('default',
    [
        'watch',
        'sass',
        'jade',
        'browser-sync'
    ]
);
