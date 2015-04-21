var $__layout_46_es6_46_js__ = (function() {
  "use strict";
  var __moduleName = "layout.es6.js";
  define(function(require, exports) {
    var LinearLayout = require('bower_components/jquery-flex-layout/src/view/linear-layout');
    var SimpleView = require('bower_components/jquery-flex-layout/src/view/simple-view');
    var loader = require('../loader/index');
    var html = require('html!./window-view');
    var mustache = require('mustache');
    var Window = require('./window');
    var windows = [];
    exports.init = function() {
      var l1 = new LinearLayout({direction: 'column'});
      var mainContent = new LinearLayout({direction: 'row'});
      var topNav = new SimpleView({selector: '.top-nav'});
      var statusBar = new SimpleView({selector: '.status-bar'});
      var explorer = new SimpleView({selector: '.file-tree'});
      var emptyWorkplace = new SimpleView({selector: $('<div></div>')});
      l1.appendView(topNav, {flex: '0 25px'});
      l1.appendView(mainContent, {flex: '1'});
      l1.appendView(statusBar, {flex: '0 20px'});
      var $dom = l1._$dom;
      mainContent.appendView(explorer, {flex: '0 200px'});
      this._linearLayout = mainContent;
      $('.everything').append($dom);
    };
    exports.appendAfterFileTree = function(view, config) {
      this._linearLayout.appendView(view, config);
    };
    exports.closeAfterFileTree = function() {
      this._linearLayout.removeViewAt(1);
    };
    exports.load2 = function(domOrHTML, $__0) {
      var $__2,
          $__3,
          $__4,
          $__5;
      var $__1 = $__0,
          dispose = ($__2 = $__1.dispose) === void 0 ? (function() {}) : $__2,
          title = ($__3 = $__1.title) === void 0 ? null : $__3,
          position = ($__4 = $__1.position) === void 0 ? 'right' : $__4,
          icon = ($__5 = $__1.icon) === void 0 ? '' : $__5;
      var $outerRoot;
      var $wrap;
      if (title) {
        $wrap = $(mustache.render(html, {title: title}));
        $outerRoot = $('<div>');
        $wrap.append($outerRoot);
      } else {
        $wrap = $outerRoot = $('<div>');
      }
      var $innerRoot = $(domOrHTML);
      var shadowRoot = $outerRoot[0].createShadowRoot();
      shadowRoot.appendChild($innerRoot[0]);
      var view = new SimpleView({selector: $wrap});
      this._linearLayout.addViewAtEdge(view, position, {flex: '1'});
      windows.push({
        model: new Window({
          name: title,
          icon: icon
        }),
        view: view,
        dispose: dispose
      });
      return $innerRoot;
    };
    exports.getWindows = function() {
      return windows;
    };
  });
  return {};
})();
//# sourceMappingURL=layout.js.map
