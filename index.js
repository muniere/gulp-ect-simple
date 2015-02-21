'use strict';

var through = require('through2');
var gutil = require('gulp-util');
var ECT = require('ect');

module.exports = function (arg) {

  arg = arg || {};

  var options = arg.options || {};
  options.ext = options.ext || '.ect';
  
  var dataFn;
  
  if (typeof arg.data === 'function') {
    dataFn = arg.data;
  } else {
    dataFn = function () {
      return arg.data || {};
    };
  }
  
  var ect = new ECT(options);

  return through.obj(function(file, enc, callback) {
    try {
      ect.render(gutil.replaceExtension(file.path, ""), dataFn(file), function(err, html) {
        if (err) {
          throw err;
        }
        file.contents = new Buffer(html);
        file.path = gutil.replaceExtension(file.path, '.html');
      });
    } catch (e) {
      this.emit('error', new gutil.PluginError('gulp-ect-simple', e.toString()));
    }
    callback(null, file);
  });
};
