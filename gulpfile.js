var gulp         = require('gulp');
var fs           = require('fs');
// html compile
var jade         = require('gulp-jade');
var prettify     = require('gulp-html-prettify');

// css compile
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var csso         = require('gulp-csso');
var csscomb      = require('gulp-csscomb');
var cssbeautify  = require('gulp-cssbeautify');
var cmq          = require('gulp-combine-media-queries');

// svg compile
var svgo         = require('gulp-svgo');
var svgSprite    = require("gulp-svg-sprite");

// coffee compile
// var coffee    = require('gulp-coffee');
var coffeex      = require('gulp-coffee-react');
var ftp          = require( 'vinyl-ftp' );

var browserSync  = require('browser-sync');
var reload       = browserSync.reload;

var FTPconfig    = require('./config').ftpConfig;

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

gulp.task('sprite', function() {
    var config = {
        dest : '.',
        mode : {
            shape:{
                dimension:{
                    attributes: true
                }
            },
            css : {
                prefix: ".ico__%s",
                dest : './build/test',
                layout:'diagonal',
                dimensions: true,
                sprite : '../img/sprite.svg',
                render : {
                     // css : {dest : 'css/sprite.css'},
                     scss : {
                        dest : '../../scss/meta/_sprite.scss'
                     }
                },
            }
        }
    };
    gulp.src('./svg/*.svg')
        .pipe(svgSprite(config))
        .pipe(gulp.dest('./'));
})

gulp.task( 'upload', function() {
    var conn = ftp.create( FTPconfig );
    var globs = [
        './build/**'
    ];

    return gulp.src( globs, { base: './build/', buffer: false } )
        .pipe( conn.dest( '/' ) );
} );


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

gulp.task('coffee', function() {
  gulp.src('./coffee/**/*.coffee')
    // .pipe(coffee())
    .pipe(coffeex())
    .pipe(gulp.dest('./build/js/'))
    .pipe(reload({stream:true}));
});

gulp.task('sass', function () {
    gulp.src(['./scss/style.scss'])
        .pipe(sass({
            outputStyle: 'nested',
            errLogToConsole: true
        }))
        .pipe(autoprefixer({
            browsers: ['ie >= 8', 'last 3 versions', '> 2%'],
            cascade: false
        }))
        .pipe(cmq())
        .pipe(csso())
        .pipe(cssbeautify({
            autosemicolon: true
        }))
        .pipe(csscomb())
        .pipe(gulp.dest('./build/css'))
        .pipe(reload({stream:true}));
});

gulp.task('watch', function () {
    gulp.watch('./scss/**/*.scss', ['sass']);
    gulp.watch('./coffee/**/*.coffee', ['coffee']);
    gulp.watch('./svg/**/*.svg', ['sprite']);
    gulp.watch(['./jade/**/*.jade', './json/**/*.json'], ['jade']);
});

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
