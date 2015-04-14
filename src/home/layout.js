var $__layout_46_es6_46_js__ = (function() {
  "use strict";
  var __moduleName = "layout.es6.js";
  define(function(require, exports) {
    var treeLayout = require('bower_components/jquery-flex-layout/src/view/tree-layout');
    var LinearLayout = require('bower_components/jquery-flex-layout/src/view/linear-layout');
    var SimpleView = require('bower_components/jquery-flex-layout/src/view/simple-view');
    exports.init = function() {
      var l1 = new LinearLayout({direction: 'column'});
      var l2 = new LinearLayout({direction: 'row'});
      var topNav = new SimpleView({selector: '.top-nav'});
      var statusBar = new SimpleView({selector: '.status-bar'});
      var explorer = new SimpleView({selector: '.file-tree'});
      l1.appendView(topNav, {flex: '0 25px'});
      l1.appendView(l2, {flex: '1'});
      l1.appendView(statusBar, {flex: '0 20px'});
      var $dom = l1._$dom;
      l2.appendView(explorer, {flex: '0 200px'});
      this._linearLayout = l2;
      $('.everything').append($dom);
    };
    exports.appendAfterFileTree = function(view, config) {
      this._linearLayout.appendView(view, config);
    };
    exports.closeAfterFileTree = function() {
      this._linearLayout.removeViewAt(1);
    };
  });
  return {};
})();
//# sourceMappingURL=layout.js.map
