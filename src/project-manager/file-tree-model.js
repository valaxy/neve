var $__file_45_tree_45_model_46_es6_46_js__ = (function() {
  "use strict";
  var __moduleName = "file-tree-model.es6.js";
  define(function(require) {
    var FileModel = require('./file-model');
    var utility = require('../utility/utility');
    var path = requireNode('path');
    var fswrap = require('../file-system/fs-wrap');
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
        this.set('rootDir', dir);
        this.get('files').reset();
        this._pathToModel = {};
        return this._add(dir);
      },
      exist: function(file) {
        return !!this._pathToModel[file.get('path')];
      },
      rename: function(file, newName) {
        fswrap.rename(file.absolutePath(this.get('root')), newName, function(err) {
          if (err) {
            throw new Error(err);
          }
          file.set('name', newName);
        });
      },
      createFile: function(file) {
        var $__0 = this;
        var fileAbsPath = file.absolutePath(this.get('root'));
        fswrap.create(fileAbsPath, file.get('isDir'), (function() {
          var dirModel = $__0.getFileByPath(file.get('dirpath'));
          $__0.add(file, dirModel);
        }));
      },
      deleteFile: function(file) {
        var $__0 = this;
        if (this.exist(file)) {
          var absolutePath = path.join(this.get('root'), file.get('path'));
          fswrap.delete(absolutePath, file.get('isDir'), (function() {
            $__0.remove(file);
          }));
          return true;
        } else {
          return false;
        }
      },
      remove: function(file) {
        file.cut();
        this._cut(file);
        return file;
      },
      _add: function(file) {
        if (file.get('path') in this._pathToModel) {
          console.log('file that has path of "' + file.get('path') + '" exist');
          return file.cid;
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
