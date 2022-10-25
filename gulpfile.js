const { src, dest, watch, series, parallel } = require('gulp');

// dependencias CSS SASS
const sass = require('gulp-sass')(require('sass'));
const postcss = require ('gulp-postcss');
const autoprefixer = require ('autoprefixer');
const sourcemaps = require ('gulp-sourcemaps');
const cssnano = require ('cssnano');
//despues que instalo las dependencias con el const las importo

// dependencias IMAGENES
const imagemin = require ('gulp-imagemin');
const webp = require ('gulp-webp');
const avif = require ('gulp-avif');

//Funciones
function css( done ) {
    //compilar sass
    //pasos: 1 - identificar archivos osea saber que hoja estilos de sass vamos a compilar
    //2 - Compilar
    //3 - Guardad el .css

    src('src/scss/app.scss')
        .pipe( sourcemaps.init() )
        .pipe( sass().on('error', sass.logError) ) 
        //si en vez de expanded el valor es compressed minifica el css
        // le saco a sass () el {outputStyle: 'expanded' }
        .pipe( postcss([ autoprefixer() ]) )
        //, cssnano() 
        .pipe( sourcemaps.write('.') )
        .pipe( dest ('build/css') )
    
    done();
}

function imagenes(  ){
    return src('src/img/**/*')
        .pipe( imagemin({ optimizationLevel: 3 }) )
        .pipe( dest('build/img') );    
}

function versionWebp () {
    const opciones = {
        quality: 50
    }
    return src('src/img/**/*.{png,jpg,jpeg}')
        .pipe ( webp() )
        .pipe( dest('build/img') )
}

function versionAvif () {
    const opciones = {
        quality: 50
    }
    return src('src/img/**/*.{png,jpg,jpeg}')
        .pipe ( avif() )
        .pipe( dest('build/img') )
}

function dev() {
    watch ('src/scss/**/*.scss', css);
    /*escucha todos los .scss dentro de la carpeta src*/
    /*watch( 'src/scss/app.scss', css ); hasta aca el watch sol escucha en esta ubicacion*/  
    watch ( 'src/img/**/*', imagenes);
}


//exports

exports.micss = css;/*se llama gulp micss*/
exports.midev = dev;/*se llama gulp midev*/
exports.misimagenes = imagenes;/*se llama gulp midev*/
exports.miwebp = versionWebp;/*se llama gulp midev*/
exports.miavif = versionAvif;/*se llama gulp midev*/
exports.default = series (imagenes, versionWebp, versionAvif, css, dev);/*aca se llama por el nombre de las funciones*/

