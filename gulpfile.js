var gulp                 = require('gulp');
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
var imagemin             = require('gulp-imagemin');
var posthtml             = require('gulp-posthtml');
var ftp                  = require('vinyl-ftp');
var clean                = require('gulp-clean');

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

gulp.task('imagemin_clear', function () {
    return gulp.src('app/img')
        .pipe(clean())
})

gulp.task('imagemin', ["imagemin_clear"], function () {
    return gulp.src('./assets/images/**')
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
    var data = require('./assets/json/data.json');

    return gulp.src('./assets/jade/!(_)*.jade')
        .pipe(jade({
            pretty: true,
            locals: data,
        }))
        .pipe(posthtml([
            require('posthtml-bem')({
                elemPrefix: '__',
                modPrefix: '_',
                modDlmtr: '--'
            })
        ]))
        .pipe(prettify({indent_size: 4}))
        .on('error', console.log)
        .pipe(gulp.dest('./app/'))
        .on('end', browserSync.reload)
});

gulp.task('sass', function () {
    gulp.src(['./assets/scss/**/*.scss'])

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
    return gulp.src(['./assets/babel/**/*.js'])
        .pipe(babel({
            comments: false
        }))
        .pipe(gulp.dest('./app/js/'))
        .pipe(reload({stream: true}));
});

gulp.task( 'deploy', function () {

    var conn = ftp.create( {
        host:     'ftp44.hostland.ru',
        user:     'host1339720_test',
        password: '8242332812',
        parallel: 1
    } );

    var globs = [
        'app/**'
    ];

    return gulp.src( globs, { base: './app', buffer: false } )
        // .pipe( conn.newer( '/' ) ) // only upload newer files
        .pipe( conn.dest( '/' ) );

} );

gulp.task("misc_files", function () {
    gulp.src(['assets/misc/**'])
        .pipe(gulp.dest('app/'))
})

gulp.task('static', ["misc_files"], function () {
    gulp.src(['assets/libs/**'])
        .pipe(gulp.dest('app/js'))

    gulp.src(['assets/font/**'])
        .pipe(gulp.dest('app/font'))
})

gulp.task('default', ['sass', 'imagemin', 'babel', 'jade', 'browser-sync', 'static'], function () {
    gulp.watch('assets/scss/**/*.scss', ['sass']);
    gulp.watch('assets/babel/**/*.js', ['babel']);
    gulp.watch('assets/images/**', ['imagemin']);
    gulp.watch('assets/jade/**/*.jade', ['jade']);
    gulp.watch('assets/json/**/*.json', ['jade']);
});
