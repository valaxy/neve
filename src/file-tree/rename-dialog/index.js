var $__index_46_es6_46_js__ = (function() {
  "use strict";
  var __moduleName = "index.es6.js";
  define(function(require, exports) {
    var Backbone = require('backbone');
    var html = require('html!./index');
    var css = require('style!./index');
    var dom = require('../../utility/dom');
    require('magnific-popup');
    require('backbone.epoxy');
    var View = Backbone.Epoxy.View.extend({
      events: {
        'click .confirm': function() {
          this.model.get('tree').rename(this.model, 'xxxx');
          $.magnificPopup.close();
        },
        'click .cancel': function() {
          $.magnificPopup.close();
        }
      },
      bindings: {},
      initialize: function() {
        this.setElement($(html));
        dom.appendStyle(this.el, css);
        this.render();
      },
      render: function() {
        this.$('dialog-title name').html(this.model.get('name'));
      },
      setModel: function(file) {
        this.removeBindings();
        this.undelegateEvents();
        this.model = file;
        this.delegateEvents();
        this.applyBindings();
        this.render();
      }
    });
    var view;
    exports.show = function(file) {
      if (!view) {
        view = new View({model: file});
      } else {
        view.setModel(file);
      }
      $.magnificPopup.open({
        items: {
          src: view.$el,
          type: 'inline'
        },
        modal: true
      });
    };
  });
  return {};
})();
//# sourceMappingURL=index.js.map
