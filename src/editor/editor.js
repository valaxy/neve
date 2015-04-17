var $__editor_46_es6_46_js__ = (function() {
  "use strict";
  var __moduleName = "editor.es6.js";
  define(function(require) {
    var fs = requireNode('fs');
    var g = require('../home/global');
    var $ = require('jquery');
    var loader = require('../loader/index');
    var html = require('html!./index');
    var Editor = Backbone.View.extend({
      _onOpenFile: function(project, file) {
        this.$el.show();
        var content = fs.readFileSync(file.absolutePath(project.get('location')), {encoding: 'utf-8'});
        console.log(content);
        this._editor.setValue(content);
      },
      _onCloseFile: function(project, file) {
        this.$el.hide();
      },
      initialize: function(options) {
        this.setElement($(html));
        var projectManager = options.projectManager;
        var editor = g.editor = ace.edit(this.$('.ace')[0]);
        this._editor = editor;
        editor.getSession().setMode("ace/mode/javascript");
        editor.setTheme("ace/theme/github");
        editor.renderer.setShowGutter(false);
        var me = this;
        projectManager.on('openFile', function(project, file) {
          if (file) {
            me._onOpenFile(project, file);
          } else {
            me._onCloseFile(project, file);
          }
        });
      }
    });
    return Editor;
  });
  return {};
})();
//# sourceMappingURL=editor.js.map
