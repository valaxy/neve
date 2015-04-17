var $__file_45_tree_45_model_46_es6_46_js__ = (function() {
  "use strict";
  var __moduleName = "file-tree-model.es6.js";
  define(function(require) {
    var FileModel = require('./file-model');
    var utility = require('../utility/utility');
    var path = requireNode('path');
    var fs = requireNode('fs');
    var FileTreeModel = Backbone.RelationalModel.extend({
      defaults: function() {
        return {
          project: null,
          root: ''
        };
      },
      relations: [{
        key: 'rootDir',
        type: Backbone.HasOne,
        relatedModel: FileModel,
        reverseRelation: {type: Backbone.HasOne}
      }, {
        key: 'files',
        type: Backbone.HasMany,
        relatedModel: FileModel,
        reverseRelation: {key: 'tree'}
      }],
      initialize: function() {
        this._pathToModel = {};
      },
      getFileByPath: function(path) {
        return this._pathToModel[path];
      },
      add: function(child, parent) {
        parent.addFile(child);
        return this._add(child);
      },
      addRoot: function(dir) {
        if (dir) {
          this.set('rootDir', dir);
          this.get('files').reset();
          this._pathToModel = {};
          return this._add(dir);
        } else {
          this.set('rootDir', dir);
          this.get('files').reset();
          this._pathToModel = {};
          return null;
        }
      },
      remove: function(file) {
        file.cut();
        this._cut(file);
        return file;
      },
      _add: function(file) {
        if (file.get('path') in this._pathToModel) {
          throw 'file that has path of "' + file.get('path') + '" exist';
        }
        this._pathToModel[file.get('path')] = file;
        this.get('files').add(file);
        return file.cid;
      },
      _cut: function(file) {
        this.get('files').remove(file);
        delete this._pathToModel[file.get('path')];
        var me = this;
        file.get('children').forEach(function(child) {
          me._cut(child);
        });
      }
    });
    return FileTreeModel;
  });
  return {};
})();
//# sourceMappingURL=file-tree-model.js.map
