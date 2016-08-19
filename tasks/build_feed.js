'use strict';

import gulp from 'gulp';
import gutil from 'gulp-util';
import through from 'through2';
import wrap from 'gulp-wrap';
import fs from 'fs';
import map from 'map-stream';
import File from 'vinyl';
import connect from 'gulp-connect';
import frontMatter from 'gulp-front-matter';
import {articlesSrc, distDir, domain} from './config'

const siteInfo = JSON.parse(fs.readFileSync('./package.json'));

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
  file.frontMatter.author = siteInfo.author;
  file.frontMatter.email = siteInfo.email;
  file.frontMatter.date = getUTCdate(file.frontMatter.date);
  file.frontMatter.description = file.frontMatter.description || null;
  file.frontMatter.relativePath = file.path.replace(file.base,'/');
  file.frontMatter.url = file.frontMatter.relativePath.replace(/index.(html|md)/,'');
  file.frontMatter.root = domain;
  file.frontMatter.html_contents = file.contents.toString();
  cb(null, file);
};

const getUTCdate = function(input) {
  let date = new Date(input)
  if(typeof input === 'undefined') {
    date = new Date();
  }
  return date.toUTCString()
}

const collectArticles = function(templates) {
  const posts = [];

  function combineMeta(file, encoding, callback) {
    posts.push(file.frontMatter);
    return callback();
  }

  function buildFile(callback) {
    posts.sort(function(a, b) {
        a = new Date(a.date);
        b = new Date(b.date);
        return a>b ? -1 : a<b ? 1 : 0;
    });

    const file = new File({
      path: 'feed.xml',
      contents: new Buffer('')
    });
    file.data = {};
    file.data.items = posts;
    file.data.domain = domain;
    file.data.buildDate = getUTCdate();
    file.data.siteTitle = `The collected witterings of Rich Archer`;
    file.data.description =  siteInfo.description;

    this.push(file);
    callback();
  }

  return through.obj(combineMeta, buildFile);
}

export function feed() {
  return gulp.src(articlesSrc)
    .pipe(frontMatter())
    .pipe(map(md2html))
    .pipe(map(globalAttributes))
    .pipe(collectArticles())
    .pipe(wrap(function (data) {
      return fs.readFileSync('./src/templates/feed.nunjucks').toString()
    }, null, {engine: 'nunjucks'}))
    .pipe(gulp.dest(distDir))
    .pipe(connect.reload());
}
