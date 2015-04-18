var $__auto_45_save_46_es6_46_js__ = (function() {
  "use strict";
  var __moduleName = "auto-save.es6.js";
  define(function(require, exports) {
    var editorWatch = require('./../editor-watch');
    var fs = requireNode('fs');
    _.extend(exports, Backbone.Events);
    exports.init = function(options) {
      var projectManager = options.projectManager;
      editorWatch.on('update', function(done, text) {
        var project = projectManager.active();
        var file = project.get('openFile');
        if (file) {
          var absolutePath = file.absolutePath(project.get('location'));
          fs.writeFile(absolutePath, text, function(err) {
            if (err) {
              console.error(err);
            }
            console.log('auto save');
          });
          exports.trigger('save');
        }
        done();
      });
    };
  });
  return {};
})();
//# sourceMappingURL=auto-save.js.map
