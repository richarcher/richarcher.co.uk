'use strict';

import gulp from 'gulp';
import sitemap from 'gulp-sitemap';
import {staticsSrc, distDir, domain} from './config'

export function site_map() {
  return gulp.src(['build/**/*.html', '!build/google13bf2a968795a317.html'], {read: false})
  .pipe(sitemap({siteUrl: domain}))
  .pipe(gulp.dest(distDir))
}
