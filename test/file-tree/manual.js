var $__manual_46_es6_46_js__ = (function() {
  "use strict";
  var __moduleName = "manual.es6.js";
  define(function(require, exports) {
    var FileTreeModel = require('src/file-tree/file-tree-model');
    var FileTreeView = require('src/file-tree/file-tree-view');
    var ProjectManager = require('src/project-manager/project-manager');
    var ProjectModel = require('src/project-manager/project-model');
    var css = require('css!src/file-tree/index');
    var $ = require('jquery');
    var Backbone = require('backbone');
    exports.init = function() {
      var manager = new ProjectManager;
      var view = (new FileTreeView({
        model: new FileTreeModel,
        projectManager: manager
      }));
      new (Backbone.View.extend({
        el: $('.file-tree'),
        events: {selectFile: function(e, file) {}}
      }));
      manager.open(new ProjectModel({
        name: 'CF',
        location: 'd:/test'
      }));
    };
  });
  return {};
})();
//# sourceMappingURL=manual.js.map
