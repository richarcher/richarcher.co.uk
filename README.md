# Richarcher.co.uk

My [Gulp](http://gulpjs.com/)-generated personal blog for https://richarcher.co.uk.

## Development server

`npm i` to install all the Gulp goodies.

`gulp preview` to run on a local server.

`gulp build [--env=(production|staging)]` to generate a development/staging/production build.

## Deployment

`npm i s3-deploy -g`

You will be required to set up AWS credentials - [read more](http://docs.aws.amazon.com/cli/latest/topic/config-vars.html)

*Staging deploy* `s3-deploy './build/**' --cwd './build/' --bucket [your.staging.bucket]`

*Production deploy* `s3-deploy './build/**' --cwd './build/' --bucket [your.production.bucket] --cache 86400 --etag --gzip`
