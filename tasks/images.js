'use strict';

import gulp from 'gulp';
import {imagesSrc, distDir} from './config'

export function images() {
  return gulp.src(imagesSrc)
  .pipe(gulp.dest(distDir))
}
