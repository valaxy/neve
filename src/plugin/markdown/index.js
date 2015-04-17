var $__index_46_es6_46_js__ = (function() {
  "use strict";
  var __moduleName = "index.es6.js";
  define(function(require, exports) {
    var markdown = require('bundle!marked');
    var loader = require('../../loader/index');
    var layout = require('../../home/layout');
    var fileWatcherLoader = require('../../loader/file-watcher-loader');
    var html = require('html!./preview');
    exports.init = function(options) {
      this._projectManager = options.projectManager;
      this._projectManager.on('open', function() {});
      this._projectManager.on('close', function() {});
      var $preview = layout.load2(html, function() {});
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
