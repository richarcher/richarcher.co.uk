'use strict';

import gulp from 'gulp'
import {scssSrc, distDir, devBuild} from './config'
import sass from 'gulp-sass'
import sourcemaps from 'gulp-sourcemaps'
import autoprefixer from 'gulp-autoprefixer'
import connect from 'gulp-connect'
import gulpif from 'gulp-if'

export function styles () {
  return gulp.src(scssSrc)
  .pipe(
    gulpif(devBuild, sourcemaps.init())
  )
  .pipe(
    gulpif(devBuild, sass().on('error', sass.logError))
  )
  .pipe(
    gulpif(devBuild, autoprefixer({
          browsers: ['last 3 versions'],
          cascade: false
        }
      ))
  )
  .pipe(
    gulpif(devBuild, sourcemaps.write())
  )
  .pipe(
    gulpif(!devBuild, sass({outputStyle: 'compressed'}).on('error', sass.logError))
  )
  .pipe(
    gulpif(!devBuild, autoprefixer({
          browsers: ['last 3 versions'],
          cascade: false
        }
      ))
  )
  .pipe(gulp.dest(distDir))
  .pipe(connect.reload())
}
