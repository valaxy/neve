var $__index_46_es6_46_js__ = (function() {
  "use strict";
  var __moduleName = "index.es6.js";
  define(function(require) {
    var loader = require('../loader/index');
    var dom = require('../utility/dom');
    var html = require('html!./index');
    var css = require('style!./index');
    var StatusBar = Backbone.View.extend({
      events: {'click .views': function(e) {
          this.$('.menu').show();
          e.preventDefault();
          return false;
        }},
      initialize: function() {
        var $__0 = this;
        var shadow = loader.loadDom('status-bar', html);
        this.setElement(shadow.querySelectorAll(':first-child')[0]);
        dom.appendStyle(shadow, css);
        $(document).click((function() {
          $__0.$('.menu').hide();
        }));
      }
    });
    return StatusBar;
  });
  return {};
})();
//# sourceMappingURL=index.js.map
