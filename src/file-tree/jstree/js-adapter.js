var $__js_45_adapter_46_es6_46_js__ = (function() {
  "use strict";
  var __moduleName = "js-adapter.es6.js";
  define(function(require) {
    var _ = require('underscore');
    var JstreeAdapter = function($root) {
      this._$root = $root;
    };
    JstreeAdapter.prototype = {
      init: function() {},
      initContextMenu: function(fn) {
        var $__0 = this;
        this._$root.jstree({
          core: {check_callback: true},
          types: {
            file: {icon: 'fa fa-file-o'},
            directory: {icon: 'fa fa-folder'}
          },
          contextmenu: {items: function(node) {
              var items = fn({
                id: node.id,
                isDir: node.type == 'directory',
                data: node.data
              });
              var keys = _.map(items, function(item, index) {
                return index;
              });
              var values = _.map(items, function(item) {
                return {
                  label: item.label,
                  action: item.action
                };
              });
              return _.object(keys, values);
            }},
          plugins: ['types', 'wholerow', 'contextmenu']
        });
        var me = this;
        this._$root.on('select_node.jstree', function(event, data) {
          var domId = data.selected[0];
          var file = me.getFile(domId).data;
          me._$root.trigger('selectFile', [file]);
        });
        this._$root.on('dblclick.jstree', (function(event) {
          var id = $(event.target).parent()[0].id;
          var file = this.getFile(id);
          if (!file.isDir) {
            var model = file.data;
            this._$root.trigger('openFile', [model]);
          }
        }).bind(this));
        $(document).on('context_show.vakata', (function(e, data) {
          $__0._$root.parent().append(data.element.css({
            display: 'block',
            left: data.reference[0].offsetLeft + 'px',
            top: data.reference[0].offsetTop + 'px'
          }));
          data.element.find('a').mousedown(function() {
            $(this).click();
          });
        }));
        $(document).on('context_hide.vakata', (function(e, data) {
          return false;
        }));
        this._jstree = this._$root.jstree();
      },
      addFile: function(file, parentId, callback) {
        var domId = this._jstree.create_node(parentId, {
          data: file.data,
          text: file.label,
          type: file.isDir ? 'directory' : 'file',
          state: {opened: true}
        }, 'last', function() {});
        return domId;
      },
      updateFile: function(id, file) {},
      deleteFile: function(id) {
        this._jstree.delete_node(id);
      },
      getFile: function(id) {
        var node = this._jstree.get_node(id);
        return {
          id: node.id,
          label: node.text,
          icon: node.icon,
          isDir: node.type == 'directory',
          data: node.data
        };
      },
      selectFile: function(id) {
        this._jstree.select_node(id);
      }
    };
    return JstreeAdapter;
  });
  return {};
})();
//# sourceMappingURL=js-adapter.js.map
