var $__index_46_es6_46_js__ = (function() {
  "use strict";
  var __moduleName = "index.es6.js";
  define(function(require, exports) {
    var EditorView = require('./editor');
    var layout = require('../window/layout');
    exports.init = function(options) {
      var projectManager = options.projectManager;
      var editorView = new EditorView({projectManager: projectManager});
      layout.load2(editorView.el, function() {
        console.log('should dispose me');
      });
    };
  });
  return {};
})();
//# sourceMappingURL=index.js.map
