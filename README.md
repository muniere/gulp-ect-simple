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

## API

### ect(arg)

#### arg.options

Type: `Object`, Default: `{}`

Optional parameter for new ECT instance.

See [baryshev/ect](https://github.com/baryshev/ect) for more information.

#### arg.data

Type: `Object`, Default: `{}`

The template context data. 
