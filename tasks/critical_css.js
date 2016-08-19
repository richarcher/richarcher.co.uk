'use strict';

import gulp from 'gulp';
import {imagesSrc, distDir, devBuild} from './config'
import criticalCSS from 'critical';
import gulpif from 'gulp-if';

const critical = criticalCSS.stream;

export function critical_css() {
  return gulp.src('build/**/*.html')
    .pipe(
      gulpif(!devBuild, critical({base: distDir, inline: true, css: ['build/style.css']}))
    )
    .pipe(gulp.dest(distDir));
}
