var $__index_46_es6_46_js__ = (function() {
  "use strict";
  var __moduleName = "index.es6.js";
  define(function(require, exports) {
    var g = require('./global');
    var layout = require('../window/layout');
    var ProjectManager = require('../project-manager/project-manager');
    var ProjectModel = require('../project-manager/project-model');
    var Loading = require('../loading/index');
    var fileWatcherLoader = require('../file-watch-api/file-watcher-loader');
    var stackAnalysis = require('stack-analysis');
    var pandocPlugin = require('../plugin/pandoc/index');
    var markdownPlugin = require('../plugin/markdown/index');
    var loader = require('../loader/index');
    var editor = require('../editor/index');
    require('css!./index');
    require('css!bower_components/normalize.css/normalize.css');
    exports.init = function() {
      var loading = new Loading;
      var projectManager = g.projectManager = new ProjectManager;
      $.when(loader.load('../status-bar/view').done(function(StatusBarView) {
        new StatusBarView;
      }), loader.load('../top-nav/index').done(function(TopNavView) {
        new TopNavView({projectManager: projectManager});
      }), loader.load('../file-tree/file-tree-view', '../project-manager/file-tree-model').done(function(FileTreeView, FileTreeModel) {
        g.fileTree = (new FileTreeView({
          model: new FileTreeModel,
          projectManager: projectManager
        })).model;
      })).done(function() {
        layout.init();
        loading.dispose();
        fileWatcherLoader.init({projectManager: projectManager});
        editor.init({projectManager: projectManager});
        markdownPlugin.init({projectManager: projectManager});
        projectManager.open(new ProjectModel({
          name: 'CF',
          location: 'd:/test'
        }));
        setTimeout(function() {}, 500);
      });
    };
  });
  return {};
})();
//# sourceMappingURL=index.js.map
