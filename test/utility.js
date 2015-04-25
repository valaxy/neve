var $__utility_46_es6_46_js__ = (function() {
  "use strict";
  var __moduleName = "utility.es6.js";
  define(function(require, exports) {
    var temp = requireNode('temp');
    var fs = requireNode('fs');
    var path = requireNode('path');
    exports.createProjectFiles = function() {
      var rootdir = temp.mkdirSync('temp');
      fs.writeFileSync(path.join(rootdir, '1.txt'), '111');
      fs.writeFileSync(path.join(rootdir, '2.md'), '222');
      fs.mkdirSync(path.join(rootdir, 'a'));
      fs.writeFileSync(path.join(rootdir, 'a', '3.md'), '333');
      return rootdir;
    };
  });
  return {};
})();
//# sourceMappingURL=utility.js.map
