'use strict';

import gulp from 'gulp';
import {staticsSrc, distDir} from './config'

export function statics() {
  return gulp.src(staticsSrc)
  .pipe(gulp.dest(distDir))
}
