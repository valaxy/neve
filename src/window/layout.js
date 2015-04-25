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
    var WindowView = require('./window-view');
    var windows = [];
    var welcome = new SimpleView({selector: $('<div><h1>Welcome</h1></div>')});
    exports.init = function() {
      var root = new LinearLayout({direction: 'column'});
      var topNav = new SimpleView({selector: '.top-nav'});
      var statusBar = new SimpleView({selector: '.status-bar'});
      var mainContent = new LinearLayout({direction: 'row'});
      root.appendView(topNav, {flex: '0 25px'});
      root.appendView(mainContent, {
        flex: '1',
        resizeableBefore: false
      });
      root.appendView(statusBar, {
        flex: '0 20px',
        resizeableBefore: false
      });
      mainContent.appendView(welcome, {flex: '1'});
      this._linearLayout = mainContent;
      $('.everything').append(root.$dom());
      this.load2($('.file-tree'), {
        position: 'left',
        flex: '0 300px',
        title: 'explorer'
      });
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
          $__5,
          $__6;
      var $__1 = $__0,
          dispose = ($__2 = $__1.dispose) === void 0 ? (function() {}) : $__2,
          title = ($__3 = $__1.title) === void 0 ? null : $__3,
          position = ($__4 = $__1.position) === void 0 ? 'right' : $__4,
          icon = ($__5 = $__1.icon) === void 0 ? '' : $__5,
          flex = ($__6 = $__1.flex) === void 0 ? '1' : $__6;
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
      console.log(this._linearLayout.getViewAt(0));
      if (this._linearLayout.getViewAt(0) == welcome) {
        welcome.replaceWith(view);
      } else {
        this._linearLayout.addViewAtEdge(view, position, {flex: flex});
      }
      var window = new Window({
        name: title,
        icon: icon
      });
      windows.push({
        model: window,
        view: view,
        dispose: dispose
      });
      new WindowView({
        model: window,
        el: $wrap
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
