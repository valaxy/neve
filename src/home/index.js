var $__index_46_es6_46_js__ = (function() {
  "use strict";
  var __moduleName = "index.es6.js";
  define(function(require, exports) {
    var g = require('./global');
    var layout = require('./layout');
    var ProjectManager = require('../project-manager/project-manager');
    var ProjectModel = require('../project-manager/project-model');
    var Loading = require('../loading/index');
    var fileWatcherLoader = require('../loader/file-watcher-loader');
    var pandocPlugin = require('../plugin/pandoc/index');
    var markdownPlugin = require('../plugin/markdown/index');
    var loader = require('../loader/index');
    var editor = require('../editor/index');
    require('css!./index');
    require('css!bower_components/normalize.css/normalize.css');
    exports.init = function() {
      var loading = new Loading;
      var editorView;
      var projectManager = g.projectManager = new ProjectManager;
      $.when(loader.load('../status-bar/index').done(function(StatusBar) {
        new StatusBar;
      }), loader.load('../top-nav/index').done(function(TopNavView) {
        new TopNavView({projectManager: projectManager});
      }), loader.load('../file-tree/file-tree-view', '../file-tree/file-tree-model').done(function(FileTreeView, FileTreeModel) {
        g.fileTree = (new FileTreeView({
          model: new FileTreeModel,
          projectManager: projectManager
        })).model;
      })).done(function() {
        layout.init();
        loading.dispose();
        fileWatcherLoader.init();
        editor.init({projectManager: projectManager});
        markdownPlugin.init({projectManager: projectManager});
        projectManager.open(new ProjectModel({
          name: 'CF',
          location: 'd:/test'
        }));
        setTimeout(function() {
          var file = g.fileTree.getFileByPath('readme.md');
          g.fileTree.get('project').set('openFile', file);
          $('.status-bar::shadow .views').click();
        }, 500);
      });
    };
  });
  return {};
})();
//# sourceMappingURL=index.js.map
