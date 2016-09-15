'use strict';

import gulp from 'gulp';
import gutil from 'gulp-util';
import {articlesSrc, distDir, devBuild, domain} from './config'

import frontMatter from 'gulp-front-matter';
import map from 'map-stream';
import wrap from 'gulp-wrap';
import fs from 'fs';
import htmlmin from 'gulp-htmlmin';
import gulpif from 'gulp-if';
import rename from 'gulp-rename';
import connect from 'gulp-connect';

import markdownit from 'markdown-it';
import hljs from 'highlight.js';

const markdownConfig = {
  html: true,
  linkify: true,
  typographer: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' +
               hljs.highlight(lang, str, true).value +
               '</code></pre>';
      } catch (__) {}
    }
    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
  }
};

const md = markdownit(markdownConfig)
  .use(require('markdown-it-footnote'))
  .use(require('markdown-it-imsize'), { autofill: true })
  .use(require('markdown-it-block-image'), { outputContainer: 'div', containerClassName: 'i-fullwidth' });

const md2html = function markdownToHtml(file, cb) {
    let result = md.render(file.contents.toString());
    file.contents = new Buffer(result);
    file.path = gutil.replaceExtension(file.path, '.html');
    cb(null, file);
};

const globalAttributes = function(file, cb) {
  let foo = JSON.parse(fs.readFileSync('./package.json'));
  file.data = {}
  file.data.author = foo.author;
  file.data.date = getFormattedDate(file.frontMatter.date);
  file.data.dateFormatUTC = getFormattedDate(file.frontMatter.date);
  file.data.description = file.frontMatter.description || foo.description;
  file.data.relativePath = file.path.replace(file.base,'/');
  file.data.url = file.data.relativePath.replace(/\/index.(html|md)/,'');
  file.data.root = domain;
  file.data.title = file.frontMatter.title || `The collected witterings of Rich Archer`;
  file.data.siteTitle = `${file.data.title} | ${file.data.author}`
  file.data.devBuild = devBuild
  cb(null, file);
};

const getFormattedDate = function(input) {
    let pattern = /(.*?)-(.*?)-(.*?) (.*?)$/
    let result = input.replace(pattern,function(match,p1,p2,p3, p4){
        let months = ['January','Febrary','March','April','May','June','July','August','September','October','November','December'];
        return p3 + " " + months[(p2-1)] + " " + p1;
    });
    return result;
}

export function html_articles() {
  return gulp.src(articlesSrc)
  .pipe(frontMatter())
  .pipe(map(md2html))
  .pipe(map(globalAttributes))
  .pipe(wrap(function (data) {
    return fs.readFileSync('./src/templates/article.nunjucks').toString()
  }, null, {engine: 'nunjucks'}))
  .pipe(
    gulpif(!devBuild, htmlmin({collapseWhitespace: true}))
  )
  .pipe(gulp.dest(distDir))
  .pipe(connect.reload())
};

export function amp_articles() {
  return gulp.src(articlesSrc)
  .pipe(frontMatter())
  .pipe(map(md2html))
  .pipe(map(globalAttributes))
  .pipe(wrap(function (data) {
    return fs.readFileSync('./src/templates/article_amp.nunjucks').toString()
  }, null, {engine: 'nunjucks'}))
  .pipe(rename({
    extname: ".amp.html"
  }))
  .pipe(
    gulpif(!devBuild, htmlmin({collapseWhitespace: true}))
  )
  .pipe(gulp.dest(distDir))
  .pipe(connect.reload())
};
