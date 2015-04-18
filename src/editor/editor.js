var $__editor_46_es6_46_js__ = (function() {
  "use strict";
  var __moduleName = "editor.es6.js";
  define(function(require) {
    var fs = requireNode('fs');
    var g = require('../home/global');
    var $ = require('jquery');
    var ace = require('ace');
    var loader = require('../loader/index');
    var autoSave = require('./plugin/auto-save');
    var dom = require('../utility/dom');
    var html = require('html!./index');
    var css = require('style!./index');
    var Editor = Backbone.View.extend({
      _onOpenFile: function(project, file) {
        this.$el.show();
        var content = fs.readFileSync(file.absolutePath(project.get('location')), {encoding: 'utf-8'});
        this._editor.setValue(content);
      },
      _onCloseFile: function(project, file) {
        this.$el.hide();
      },
      initialize: function(options) {
        var $__0 = this;
        this.setElement($(html));
        dom.appendStyle(this.el, css);
        var projectManager = options.projectManager;
        var editor = g.editor = ace.edit(this.$('.ace')[0]);
        this._editor = editor;
        editor.setTheme("ace/theme/chrome");
        editor.getSession().setMode("ace/mode/markdown");
        editor.renderer.setShowGutter(false);
        var style1 = document.getElementById('ace_editor');
        var style2 = document.getElementById('ace-tm');
        var style3 = style2.nextSibling;
        this.el.appendChild(style1);
        this.el.appendChild(style2);
        this.el.appendChild(style3);
        setTimeout((function() {
          var style4 = document.getElementById('ace-chrome');
          $__0.el.appendChild(style4);
        }), 100);
        projectManager.on('openFile', (function(project, file) {
          if (file) {
            $__0._onOpenFile(project, file);
          } else {
            $__0._onCloseFile(project, file);
          }
        }));
        autoSave.init({projectManager: projectManager});
      }
    });
    return Editor;
  });
  return {};
})();
//# sourceMappingURL=editor.js.map
