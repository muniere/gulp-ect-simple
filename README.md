# gulp-ect-simple

[![Build Status](https://travis-ci.org/muniere/gulp-ect-simple.svg)](https://travis-ci.org/muniere/gulp-ect-simple)

Gulp plugin to compile with [ect](http://ectjs.com/)

## Installation

```
npm install --save-dev gulp-ect-simple
```

## Usage

```js
var gulp = require('gulp');
var ect = require('gulp-ect-simple');

gulp.task('ect', function(){
  return gulp.src('./templates/*.ect')
    .pipe(ect({
      options: { 
        root: 'app/views',
        ext: '.ect' 
      },
      data: {
        message: 'Hello, World!',
        name: 'Bob'
      }
    }))
    .pipe(gulp.dest('./dist'));
});
```

Or the data parameter can be a function that receives a file object so that you can choose what data to send into the template for compilation - handy for rendering pages for static sites!

```js
var gulp     = require('gulp');
var ect      = require('gulp-ect-simple');
var pageData = require('./my-page-data');

gulp.task('ect', function(){
  return gulp.src('./templates/*.ect')
    .pipe(ect({
      options: { 
        root: 'app/views',
        ext:  '.ect' 
      },
      data: function (file) {
        // The file parameter is a vinyl object:
        // https://github.com/wearefractal/vinyl
        return pageData[file.relative] || {foo: 'Default data'};
      }
    }))
    .pipe(gulp.dest('./dist'));
});
```


## API

### ect(arg)

#### arg.options

Type: `Object`, Default: `{}`

Optional parameter for new ECT instance.

See [baryshev/ect](https://github.com/baryshev/ect) for more information.

#### arg.data

Type: `Object`, Default: `{}`

The template context data. 
