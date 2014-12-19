'use strict';

var fs = require('fs');
var path = require('path');
var gulp = require('gulp');
var gutil = require('gulp-util');

var expect = require('expect.js');

var ect = require('../');

describe('gulp-ect-simple', function() {

  it('compiles ect file into html (single & data)', function(done) {

    var stream = ect({
      options: {
        root: 'test/source' 
      } ,
      data: {
        title: 'Hello, World!',
        message: 'Hello, Earth.'
      }
    });

    var expected = fs.readFileSync('test/fixture/single.html').toString().replace(/\n +/g, '\n');

    stream.on('data', function(file) {
      // do not test first whitespaces of each line
      var actual = file.contents.toString().replace(/\n +/g, '\n');

      expect(file.path).to.eql('single.html');
      expect(actual).to.eql(expected);
      done();
    });

    stream.write(new gutil.File({
      cwd: 'test/',
      base: 'test/source',
      path: 'single.ect'
    }));
  });

  it('compiles ect file into html (extend & include)', function(done) {

    var stream = ect({ options: { root: 'test/source' } });
    var expected = fs.readFileSync('test/fixture/multi.html').toString().replace(/\n +/g, '\n');

    stream.on('data', function(file) {
      // do not test first whitespaces of each line
      var actual = file.contents.toString().replace(/\n +/g, '\n');

      expect(file.path).to.eql('multi.html');
      expect(actual).to.eql(expected);
      done();
    });

    stream.write(new gutil.File({
      cwd: 'test/',
      base: 'test/source',
      path: 'multi.ect'
    }));
  });

  it('throws error if syntax is invalid', function(done) {

    var stream = ect({ options: { root: 'test/source' } });

    stream.on('error', function(err) {
      expect(err).to.be.ok();
      done();
    });

    stream.write(new gutil.File({
      cwd: 'test/',
      base: 'test/source',
      path: 'invalid.ect'
    }));
  });
});
