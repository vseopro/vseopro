/**
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    обьявляем переменные и зависимости
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
*/

var gulp         = require('gulp');
var jade         = require('gulp-jade');
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var csscomb      = require('gulp-csscomb');
var prettify     = require('gulp-html-prettify');
var cmq          = require('gulp-combine-media-queries');
var svgSprite    = require("gulp-svg-sprites");

var coffee       = require('gulp-coffee');

var gutil        = require( 'gulp-util' );
var ftp          = require( 'vinyl-ftp' );

var browserSync = require('browser-sync');
var reload      = browserSync.reload;

var FTPconfig = require('./config').ftpConfig;

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



/**
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    Задача для генерирования SVG спрайт
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
*/

var spriteConfig = {
    preview: false,
    layout: 'diagonal',
    padding: 0,
    selector: 'icon__%f',
    svg: {
        sprite: "img/sprite.svg"
    },
    cssFile: "./scss/meta/_sprite.scss"
};

gulp.task('sprite', function () {
    return gulp.src('./svg/**/*.svg')
        .pipe(svgSprite(spriteConfig))
        .pipe(gulp.dest("./"));
});

/**
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    задача для закачки проекта на ftp
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
*/

gulp.task( 'upload', function() {

    var conn = ftp.create( FTPconfig );

    var globs = [
        './build/**'
    ];

    // using base = '.' will transfer everything to /public_html correctly
    // turn off buffering in gulp.src for best performance

    return gulp.src( globs, { base: './build/', buffer: false } )
        // .pipe( conn.newer( '/' ) ) // only upload newer files
        .pipe( conn.dest( '/' ) );
} );

/**
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    задача для компиляции jade
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
*/

gulp.task('jade', function(){
    gulp.src('./jade/!(_)*.jade')
        .pipe(jade())
        .pipe(prettify({indent_char: '  ', indent_size: 2}))
        .on('error', console.log)
        .pipe(gulp.dest('./build/'))
        .pipe(reload({stream:true}));
});

gulp.task('coffee', function() {
  gulp.src('./coffee/**/*.coffee')
    .pipe(coffee())
    .pipe(gulp.dest('./build/js/'))
    .pipe(reload({stream:true}));
});

/**
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    задача для компиляции scss файлов
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
*/

gulp.task('sass', function () {
    gulp.src(['./scss/style.scss'])
        .pipe(sass({
            outputStyle: 'nested',
            errLogToConsole: true
        }))
        .pipe(autoprefixer('last 2 version',
            'safari 5',
            'ie 8',
            'ie 9',
            'opera 12.1',
            'ios 6',
            'android 4'
            ))
        .pipe(cmq())
        .pipe(csscomb())
        // .pipe(csso())
        .pipe(gulp.dest('./build/css'))
        .pipe(reload({stream:true}));
});

/**
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    список файлов для наблюдения
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
*/

gulp.task('watch', function () {
    gulp.watch('./scss/**/*.scss', ['sass']);
    gulp.watch('./coffee/**/*.coffee', ['coffee']);
    gulp.watch('./svg/**/*.svg', ['sprite']);
    gulp.watch('./jade/**/*.jade', ['jade']);
});

/**
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    задача по-умолчанию
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
*/

gulp.task('default',
    [
        'watch',
        'sass',
        'jade',
        'sprite',
        'coffee',
        'browser-sync'
    ]
);
