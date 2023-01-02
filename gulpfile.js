//Christine Johanson chjo2104  Miun Webbutveckling III - Projektuppgift 2022
//hämtar in gulppaketet. src källkod, dest för destination. parallel samt series är metoder. watch för den metoden
const {src, dest, parallel, series, watch} = require('gulp');
//concat för css och js
const concat = require('gulp-concat');
//terser för jsfiler
const terser = require('gulp-terser');
//för bildfiler
const imagemin = require('gulp-imagemin');
//för sass
const sass = require('gulp-sass')(require('sass'));
//gulp
const gulp = require("gulp");
//sourcemap
const sourcemaps = require('gulp-sourcemaps');
//för att synka mot browser
const browserSync = require('browser-sync').create();
//för babel
const babel = require('gulp-babel');



//objekt där vi skapar sökvägar
const files = {
    htmlPath: "src/**/*.html",
    //cssPath: "src/css/*.css",
    jsPath: "src/js/*.js",
    //eftersom bilder kan ha olika filändelser, ta * för att ta allt
    imagePath: "src/images/*",
    sassPath: "src/sass/*.scss"
}

//HTML-task, kopiera över till pub
function copyHTML() {
    //vilka filer som ska hämtas htmlpath. nu ligger de i flödet
    return src(files.htmlPath)
    //skicka vidare i pipe. till pubkatalogen, som också skapas.
    .pipe(dest('pub'))
    //skicka vidare till browsersync
    .pipe(browserSync.stream());
}

//js task
    function jsTask() {
    return src(files.jsPath)
    .pipe(babel({
        presets: ['@babel/env']
    }))
    //kompri alla js filer till en
    .pipe(concat('main.js'))
    //minifiera koden med terser. tar bort under testning.
    .pipe(terser())
    //spara i pub i js-mapp
    .pipe(dest('pub/js'));
} 

//image task
function imageTask() {
    return src(files.imagePath)
    //för att göra bilderna mindre
    .pipe(imagemin())
    .pipe(dest('pub/images'));
} 

function sassTask() {
    return src(files.sassPath)
        .pipe(sourcemaps.init())
        //komprimera ej under utveckling
        .pipe(sass().on("error", sass.logError))
        //komprimera när färdig.
        .pipe(sass({outputStyle: 'compressed'}).on("error", sass.logError))
        .pipe(sourcemaps.write('./maps'))
        .pipe(dest("pub/css"))
        .pipe(browserSync.stream());
}

//watch task för att kolla uppdateringar under arbetets gång
function watchTask() {
    //för att köra igång browsern. /pub vilken mapp den ska lyssna efter ändringar i.
    browserSync.init({
        server: "./pub"
    });
    //vilka filer den ska hålla koll på o vad som sen ska göras. vilka metoder o sökvägar alltså. metoden tar två argument.
    //onchange browser laddas om.
    watch([files.htmlPath, files.jsPath, files.imagePath, files.sassPath], parallel(copyHTML, jsTask, imageTask, sassTask)).on('change', browserSync.reload);
}


//för att kunna exportera funktioner
exports.default = series
(parallel(copyHTML, jsTask, imageTask, sassTask), 
watchTask
);