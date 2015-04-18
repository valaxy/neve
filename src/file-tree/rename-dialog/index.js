var $__index_46_es6_46_js__ = (function() {
  "use strict";
  var __moduleName = "index.es6.js";
  define(function(require, exports) {
    var Backbone = require('backbone');
    var html = require('html!./index');
    var css = require('style!./index');
    var dom = require('../../utility/dom');
    require('magnific-popup');
    require('css!bower_components/magnific-popup/dist/magnific-popup');
    var View = Backbone.View.extend({initialize: function() {
        this.setElement($(html));
        dom.appendStyle(this.el, css);
      }});
    var view = new View;
    exports.init = function() {};
    exports.show = function() {
      $.magnificPopup.open({
        items: {
          src: view.$el,
          type: 'inline'
        },
        modal: true
      });
    };
    exports.hide = function() {
      $.magnificPopup.close();
    };
  });
  return {};
})();
//# sourceMappingURL=index.js.map
