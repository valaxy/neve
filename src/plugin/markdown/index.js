var $__index_46_es6_46_js__ = (function() {
  "use strict";
  var __moduleName = "index.es6.js";
  define(function(require, exports) {
    var LinearLayout = require('bower_components/jquery-flex-layout/src/view/linear-layout');
    var SimpleView = require('bower_components/jquery-flex-layout/src/view/simple-view');
    var async = require('async');
    var markdown = require('bundle!marked');
    var loader = require('../../loader/index');
    var layout = require('../../home/layout');
    var EditorView = require('../../editor/editor');
    var fileWatcherLoader = require('../../loader/file-watcher-loader');
    var layoutLoader = require('../../loader/layout-loader');
    exports.init = function(options) {
      this._editorView = options.editorView;
      this._projectManager = options.projectManager;
      layoutLoader.load();
      this._projectManager.on('open', function() {});
      this._projectManager.on('close', function() {});
      fileWatcherLoader.load({
        name: 'markdown',
        description: 'compile markdown to html',
        script: (function(input, callback) {
          var $preview = $('.preview .content');
          var html = markdown(input);
          var top = $preview[0].scrollTop;
          $preview.html(html);
          $preview[0].scrollTop = top;
          callback();
        })
      });
    };
  });
  return {};
})();
//# sourceMappingURL=index.js.map
