var $__file_45_model_46_es6_46_js__ = (function() {
  "use strict";
  var __moduleName = "file-model.es6.js";
  define(function(require) {
    var path = require('path');
    require('backbone');
    require('backbone.epoxy');
    require('backbone-computedfields');
    var FileModel = Backbone.RelationalModel.extend({
      defaults: {
        path: '',
        isDir: true,
        isOpen: false
      },
      parse: function(attrs) {
        attrs.path = path.normalize(attrs.path);
        return attrs;
      },
      relations: [{
        key: 'children',
        type: Backbone.HasMany,
        reverseRelation: {key: 'parent'}
      }],
      computed: {
        name: {
          get: function() {
            return path.basename(this.get('path'));
          },
          set: function(value) {
            var pathValue = path.join(this.get('dirpath'), value);
            this.set('path', pathValue);
          }
        },
        nameWithoutExtension: {
          depends: [],
          get: function() {}
        },
        dirpath: {get: function() {
            return path.dirname(this.get('path'));
          }}
      },
      initialize: function() {
        this.computedFields = new Backbone.ComputedFields(this);
      },
      nameWithoutAllExtension: function() {},
      dirname: function() {
        return path.basename(this.dirpath());
      },
      absolutePath: function(root) {
        root = root ? root : this.get('tree').get('root');
        return path.join(root, this.get('path'));
      },
      isLeaf: function() {
        return this.get('children').length == 0;
      },
      addFile: function(child) {
        for (var i in arguments) {
          var child = arguments[i];
          this.get('children').add(child);
        }
        return this;
      },
      cut: function() {
        if (this.get('parent')) {
          return this.get('parent').get('children').remove(this);
        } else {
          return this;
        }
      }
    });
    return FileModel;
  });
  return {};
})();
//# sourceMappingURL=file-model.js.map