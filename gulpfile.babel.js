'use strict';

import gulp from 'gulp';
import connect from 'gulp-connect';

import {articlesSrc, imagesSrc, scssSrc, staticsSrc} from './tasks/config'
import {clean} from './tasks/clean';
import {styles} from './tasks/build_sass';
import {images} from './tasks/images';
import {statics} from './tasks/static_assets';
import {html_articles, amp_articles} from './tasks/build_articles';
import {html_home, amp_home} from './tasks/build_home';
import {feed} from './tasks/build_feed';
import {critical_css} from './tasks/critical_css';
import {amp_convert} from './tasks/amp_conversion';
import {site_map} from './tasks/sitemap';

function server() {
  return connect.server({
    root: 'build',
    livereload: true,
    port: 8000
  });
}

function watch() {
  gulp.watch(articlesSrc, gulp.parallel( html_articles, amp_articles ));
  gulp.watch(staticsSrc, gulp.parallel( statics ));
  gulp.watch(scssSrc, gulp.parallel( styles ) );
  gulp.watch(imagesSrc, gulp.parallel( images ) );
};

const build = gulp.series(clean, gulp.parallel(styles, images, statics, feed, html_home, amp_home, html_articles, amp_articles), site_map, critical_css, amp_convert);
const preview = gulp.series(build, gulp.parallel(server, watch));

gulp.task('preview', preview);
gulp.task('build', build);
gulp.task('default', build);
