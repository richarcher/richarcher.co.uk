import gutil from 'gulp-util'

export const baseDir = './'
export const srcDir = `${baseDir}src`
export const distDir = `${baseDir}build/`
export const templateDir = `${srcDir}/templates/`

export const scssSrc = [`${srcDir}/scss/*`]
export const articlesSrc = [`${srcDir}/html/*articles/**/index.md`]
export const imagesSrc = [
                            `${srcDir}/html/*articles/**/*`,
                            `!${srcDir}/html/*articles/**/index.md`
                          ]
export const staticsSrc = [`${srcDir}/static/**/*`]

export const env = {
  dev: 'http://localhost:8000',
  staging: 'http://staging.richarcher.co.uk.s3-website-us-east-1.amazonaws.com',
  production: 'https://richarcher.co.uk'
}

export const domain = env[gutil.env.env] || env.dev;

export const devBuild = ['production', 'staging'].indexOf(gutil.env.env) == -1;
