var $__fs_45_wrap_46_es6_46_js__ = (function() {
  "use strict";
  var __moduleName = "fs-wrap.es6.js";
  define(function(require, exports) {
    var path = requireNode('path');
    var fs = requireNode('fs');
    var trash = requireNode('trash');
    exports.create = function(absolutePath, isDirectory, callback) {
      if (isDirectory) {
        fs.mkdir(absolutePath, callback);
      } else {
        fs.writeFile(absolutePath, '', callback);
      }
    };
    exports.delete = function(absolutePath, callback) {
      trash([absolutePath], callback);
    };
    exports.rename = function(absolutePath, newName, callback) {
      var newAbsPath = path.join(path.dirname(absolutePath), newName);
      fs.rename(absolutePath, newAbsPath, callback);
    };
    exports.readFile = function(absolutePath, callback) {
      fs.readFile(absolutePath, callback);
    };
  });
  return {};
})();
//# sourceMappingURL=fs-wrap.js.map
