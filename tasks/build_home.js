'use strict';

import gulp from 'gulp';
import gutil from 'gulp-util';
import through from 'through2';
import wrap from 'gulp-wrap';
import fs from 'fs';
import map from 'map-stream';
import File from 'vinyl';
import frontMatter from 'gulp-front-matter';
import htmlmin from 'gulp-htmlmin';
import gulpif from 'gulp-if';
import rename from 'gulp-rename';
import connect from 'gulp-connect';
import {articlesSrc, distDir, domain, devBuild} from './config'

const siteInfo = JSON.parse(fs.readFileSync('./package.json'));

const globalAttributes = function(file, cb) {
  file.frontMatter.author = siteInfo.author;
  file.frontMatter.date = getFormattedDate(file.frontMatter.date);
  file.frontMatter.description = file.frontMatter.description || null;
  file.frontMatter.relativePath = file.path.replace(file.base,'/');
  file.frontMatter.url = file.frontMatter.relativePath.replace(/\/index.(html|md)/,'/');
  file.frontMatter.root = domain;
  file.frontMatter.devBuild = devBuild
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

const buildHome = function(templates) {
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
      path: 'index.html',
      contents: new Buffer('')
    });
    file.data = {};
    file.data.items = posts;
    file.data.siteTitle = `The collected witterings of Rich Archer`;
    file.data.title = `The collected witterings of Rich Archer`;
    file.data.root = domain;
    file.data.description = siteInfo.description;

    this.push(file);
    callback();
  }

  return through.obj(combineMeta, buildFile);
}

export function html_home() {
  return gulp.src(articlesSrc)
    .pipe(frontMatter())
    .pipe(map(globalAttributes))
    .pipe(buildHome())
    .pipe(wrap(function (data) {
      return fs.readFileSync('./src/templates/home.nunjucks').toString()
    }, null, {engine: 'nunjucks'}))
    .pipe(
      gulpif(!devBuild, htmlmin({collapseWhitespace: true}))
    )
    .pipe(gulp.dest(distDir))
    .pipe(connect.reload())
}

export function amp_home() {
  return gulp.src(articlesSrc)
    .pipe(frontMatter())
    .pipe(map(globalAttributes))
    .pipe(buildHome())
    .pipe(wrap(function (data) {
      return fs.readFileSync('./src/templates/home_amp.nunjucks').toString()
    }, null, {engine: 'nunjucks'}))
    .pipe(rename({
      extname: ".amp.html"
    }))
    .pipe(
      gulpif(!devBuild, htmlmin({collapseWhitespace: true}))
    )
    .pipe(gulp.dest(distDir))
    .pipe(connect.reload())
}
