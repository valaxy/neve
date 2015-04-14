var $__file_45_watcher_45_loader_46_es6_46_js__ = (function() {
  "use strict";
  var __moduleName = "file-watcher-loader.es6.js";
  define(function(require, exports) {
    var editorWatch = require('../editor/editor-watch');
    var async = require('async');
    var watchers = [];
    exports.load = function() {
      var options = arguments[0] !== (void 0) ? arguments[0] : {
        isEnabled: '',
        arguments: '',
        checkSyntaxErrors: '',
        description: '',
        exitCodeBehavior: '',
        fileExtension: '',
        immediateSync: '',
        name: '',
        output: '',
        outputFilters: '',
        outputFromStdout: '',
        passParentEnvs: '',
        program: '',
        scopeName: '',
        trackOnlyRoot: '',
        workingDir: ''
      };
      watchers.push(options);
    };
    exports.init = function() {
      editorWatch.on('update', function(allDone, text) {
        async.eachSeries(watchers, function(watcher, done) {
          if (watcher.script) {
            watcher.script(text, done);
          }
        }, function(err) {
          allDone();
        });
      });
      editorWatch.start();
    };
    exports.watcher = watchers;
  });
  return {};
})();
//# sourceMappingURL=file-watcher-loader.js.map
