var $__editor_45_watch_46_es6_46_js__ = (function() {
  "use strict";
  var __moduleName = "editor-watch.es6.js";
  define(function(require, exports) {
    var global = require('../home/global');
    var Timer = require('bower_components/timer/src/timer');
    var _ = require('underscore');
    var $ = require('jquery');
    _.extend(exports, Backbone.Events);
    var timer;
    exports.start = function() {
      function done() {
        timer.next();
      }
      var me = this;
      var lastValue = null;
      timer = new Timer({
        interval: 1000 * 2,
        immediate: true,
        task: function() {
          var value = global.editor.getValue();
          console.log(value);
          if (value == lastValue) {
            this.next();
            return ;
          }
          lastValue = value;
          me.trigger('update', done, value);
        }
      });
      timer.start();
    };
    exports.immediate = function() {
      timer.immediate();
    };
  });
  return {};
})();
//# sourceMappingURL=editor-watch.js.map
