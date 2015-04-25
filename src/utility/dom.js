var $__dom_46_es6_46_js__ = (function() {
  "use strict";
  var __moduleName = "dom.es6.js";
  define(function(require, exports) {
    exports.appendStyle = function(dom, styleContent) {
      var style = document.createElement('style');
      style.setAttribute('type', 'text/css');
      style.textContent = styleContent;
      dom.appendChild(style);
    };
    exports.importStyle = function(dom, styleUrl) {
      var style = document.createElement('style');
      style.setAttribute('type', 'text/css');
      style.textContent = '@import "' + styleUrl + '";';
      dom.appendChild(style);
    };
  });
  return {};
})();
//# sourceMappingURL=dom.js.map
