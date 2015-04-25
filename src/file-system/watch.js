var $__watch_46_es6_46_js__ = (function() {
  "use strict";
  var __moduleName = "watch.es6.js";
  define(function(require, exports) {
    var watch = requireNode('watch');
    var FileTreeWatch = function() {};
    FileTreeWatch.prototype.walkAllFiles = function(root, options, callback) {
      watch.watchTree(root, options, function(files, curr, prev) {
        if (typeof files == 'object' && curr == null && prev == null) {
          watch.unwatchTree(root);
          callback(files);
        }
      });
    };
    FileTreeWatch.prototype.watch = function(onCreate, onChange, onRemove) {};
    return FileTreeWatch;
  });
  return {};
})();
//# sourceMappingURL=watch.js.map
