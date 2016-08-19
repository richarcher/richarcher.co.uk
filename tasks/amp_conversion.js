'use strict';

import gulp from 'gulp';
import {distDir} from './config'
import replace from 'gulp-replace';

export function amp_convert() {
  return gulp.src('build/**/*.amp.html')
    .pipe(replace('<style type="text/css">', '<style amp-custom type="text/css">'))
    .pipe(replace('<img', '<amp-img layout="responsive"'))
    .pipe(gulp.dest('build/'))
}
