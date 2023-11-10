const { src, dest, watch, parallel } = require('gulp');

//CSS
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');

//Imagenes
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function css(callback){
    src('src/scss/**/*.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(dest('build/css'))
    
    callback();
}

function imagenes(callback){
    const opciones = {
        optimizationLevel: 3
    }
    
    src('src/img/**/*.{png,jpg}')
        .pipe(cache(imagemin(opciones)))
        .pipe(dest('build/img/jpng'))

    callback();
}


function formatoWebp(callback){
    const opciones = {
        quality: 50
    };
    
    src('src/img/**/*.{png,jpg}')
        .pipe(webp(opciones))
        .pipe(dest('build/img/webp'))

    callback();
}

function formatoAvif(callback){
    const opciones = {
        quality: 50
    };
    
    src('src/img/**/*.{png,jpg}')
        .pipe(avif(opciones))
        .pipe(dest('build/img/avif'))

    callback();
}

function dev(callback){
    watch('src/scss/**/*.scss', css)
    callback();
}

exports.css = css;
exports.imagenes = imagenes
exports.formatoWebp = formatoWebp;
exports.formatoAvif = formatoAvif;
exports.dev = parallel(imagenes, formatoWebp, formatoAvif, dev);