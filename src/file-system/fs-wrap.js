var $__fs_45_wrap_46_es6_46_js__ = (function() {
  "use strict";
  var __moduleName = "fs-wrap.es6.js";
  define(function(require, exports) {
    var path = require('path');
    var fs = requireNode('fs');
    var trash = requireNode('trash');
    exports.create = function(absolutePath, isDirectory, callback) {
      if (isDirectory) {
        fs.mkdir(absolutePath, callback);
      } else {
        fs.writeFile(absolutePath, '', callback);
      }
    };
    exports.delete = function(absolutePath, isDirectory, callback) {
      trash([absolutePath], callback);
    };
    exports.rename = function(absPath, newName, callback) {
      var newAbsPath = path.join(path.dirname(absPath), newName);
      console.log(newAbsPath);
      fs.rename(absPath, newAbsPath, callback);
    };
  });
  return {};
})();
//# sourceMappingURL=fs-wrap.js.map
