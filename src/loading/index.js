var $__index_46_es6_46_js__ = (function() {
  "use strict";
  var __moduleName = "index.es6.js";
  define(function(require) {
    require('css!./index');
    require('css!bower_components/css-loading-spinners/css/load3');
    var Backbone = require('backbone');
    var html = require('text!./index.html');
    var loader = require('../loader/index');
    var Loading = Backbone.View.extend({
      show: function() {
        this.$el.show();
      },
      dispose: function() {
        var me = this;
        this.$el.fadeOut(1000, function() {
          me.$el.remove();
        });
      },
      initialize: function() {
        this.setElement(loader.loadHTML(html));
        $('.everything').after(this.$el);
      }
    });
    return Loading;
  });
  return {};
})();
//# sourceMappingURL=index.js.map
