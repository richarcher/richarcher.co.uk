'use strict';

import gulp from 'gulp';
import del from 'del';

export function clean () {
  return del(['./build/**', '!./build', '!./build/.keep']);
}
