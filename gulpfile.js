const { src, dest, watch, parallel } = require('gulp');

//CSS
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');

//Imagenes
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function css(callback){
    src('src/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(sass())
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/css'))
    
    callback();
}

function imagenes(callback){
    const opciones = {
        optimizationLevel: 3
    }
    
    src('src/img/**/*.{png,jpg}')
        .pipe(cache(imagemin(opciones)))
        .pipe(dest('build/img'))

    callback();
}


function formatoWebp(callback){
    const opciones = {
        quality: 50
    };
    
    src('src/img/**/*.{png,jpg}')
        .pipe(webp(opciones))
        .pipe(dest('build/img'))

    callback();
}

function formatoAvif(callback){
    const opciones = {
        quality: 50
    };
    
    src('src/img/**/*.{png,jpg}')
        .pipe(avif(opciones))
        .pipe(dest('build/img'))

    callback();
}

function javascript(callback){
    src('src/js/**/*.js')
        .pipe(dest('build/js'))

    callback()
}

function dev(callback){
    watch('src/scss/**/*.scss', css)
    watch('src/js/**/*.js', javascript)
    callback();
}

exports.css = css;
exports.javascript = javascript;
exports.imagenes = imagenes
exports.formatoWebp = formatoWebp;
exports.formatoAvif = formatoAvif;
exports.dev = parallel(imagenes, formatoWebp, formatoAvif, javascript, dev);