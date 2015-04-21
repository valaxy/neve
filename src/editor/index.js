var $__index_46_es6_46_js__ = (function() {
  "use strict";
  var __moduleName = "index.es6.js";
  define(function(require, exports) {
    var EditorView = require('./editor');
    var layout = require('../window/layout');
    var editorView;
    exports.init = function(options) {
      var projectManager = options.projectManager;
      editorView = new EditorView({projectManager: projectManager});
      layout.load2(editorView.el, {
        title: 'Editor',
        icon: 'fa fa-paragraph',
        dispose: function() {
          console.log('should dispose me');
        }
      });
    };
    exports.getEditor = function() {
      return editorView._editor;
    };
  });
  return {};
})();
//# sourceMappingURL=index.js.map
