var $__backbone_45_simulate_45_promise_46_es6_46_js__ = (function() {
  "use strict";
  var __moduleName = "backbone-simulate-promise.es6.js";
  define(function(require, exports) {
    var Backbone = require('backbone');
    exports.mixin = function(Class) {
      var oldListenTo = Class.prototype.listenTo;
      Class.prototype.listenTo = function(event) {
        oldListenTo.apply(this, arguments);
        if (event instanceof Backbone.Model) {}
        return this;
      };
      return Class;
    };
  });
  return {};
})();
//# sourceMappingURL=backbone-simulate-promise.js.map
