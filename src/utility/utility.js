var $__utility_46_es6_46_js__ = (function() {
  "use strict";
  var __moduleName = "utility.es6.js";
  define(function(require, exports) {
    exports.extendArray = function(ary) {
      for (var i = 1; i < arguments.length; i++) {
        var superAry = arguments[i];
        for (var j = 0; j < superAry.length; j++) {
          ary.push(superAry[j]);
        }
      }
      return ary;
    };
  });
  return {};
})();
//# sourceMappingURL=utility.js.map
