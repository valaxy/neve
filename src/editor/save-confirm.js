var $__save_45_confirm_46_es6_46_js__ = (function() {
  "use strict";
  var __moduleName = "save-confirm.es6.js";
  define(function(require, exports) {
    var autoSave = require('./auto-save');
    var ExitConfirm = require('bower_components/exit-confirm/exit-confirm');
    exports.init = function(options) {
      var editor = options.editorView;
      var projectManager = options.projectManager;
      var isSave = true;
      editor.on('change', function() {
        isSave = false;
      });
      autoSave.on('save', function() {
        isSave = true;
      });
      var exitConfirm = new ExitConfirm('文档还未保存，确定退出吗？', function() {
        return isSave;
      });
      exitConfirm.on();
      projectManager.on('openFile', function() {
        alert();
      });
    };
  });
  return {};
})();
//# sourceMappingURL=save-confirm.js.map
