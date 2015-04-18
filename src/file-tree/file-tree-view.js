var $__file_45_tree_45_view_46_es6_46_js__ = (function() {
  "use strict";
  var __moduleName = "file-tree-view.es6.js";
  define(function(require) {
    var fs = requireNode('fs');
    var path = requireNode('path');
    var watch = requireNode('watch');
    var watch2 = new (require('../file-system/watch'));
    var JstreeAdapter = require('./jstree/js-adapter');
    var FileModel = require('../project-manager/file-model');
    var g = require('../home/global');
    var fswrap = require('../file-system/fs-wrap');
    var async = require('async');
    require('jstree');
    var loader = require('../loader/index');
    var html = require('text!./index.html');
    var css = require('style!./index');
    var dom = require('../utility/dom');
    var FileTreeView = Backbone.View.extend({
      _pathToDomId: {},
      events: {openFile: function(event, file) {
          this._openFile(file, true, false);
        }},
      _asyncDone: function(done) {
        return function(err) {
          if (err) {
            done(err);
          } else {
            done();
          }
        };
      },
      _deleteFile: function(fileModel, isDirectory, updateFileSystem, updateModel, updateDom) {
        var absolutePath = path.join(this.model.get('root'), fileModel.get('path'));
        var me = this;
        async.series([function(done) {
          if (updateFileSystem) {
            fswrap.delete(absolutePath, isDirectory, me._asyncDone(done));
          } else {
            done();
          }
        }, function(done) {
          if (updateModel) {
            me.model.remove(fileModel);
          }
          done();
        }, function(done) {
          if (updateDom) {
            me._fileTree.deleteFile(me._pathToDomId[fileModel.get('path')]);
          }
          done();
        }], function(err) {
          if (err) {
            alert(err);
          }
        });
      },
      _createRoot: function() {
        var model = new FileModel({
          path: '.',
          isDir: true
        });
        this.model.addRoot(model);
      },
      _addFile: function(curPath, isDirectory, updateFileSystem, updateModel, updateDom) {
        var me = this;
        var dirPath = path.dirname(curPath);
        var curModel = new FileModel({
          path: curPath,
          isDir: isDirectory
        });
        var fileAbsPath = curModel.absolutePath(me.model.get('root'));
        async.series([function(done) {
          if (updateFileSystem) {
            fs.exists(fileAbsPath, function(exists) {
              if (exists) {
                done((isDirectory ? 'directory' : 'file') + ' is exist');
              } else {
                done();
              }
            });
          } else {
            done();
          }
        }, function(done) {
          if (updateFileSystem) {
            fswrap.create(fileAbsPath, isDirectory, me._asyncDone(done));
          } else {
            done();
          }
        }, function(done) {
          if (updateModel) {
            var dirModel = me.model.getFileByPath(dirPath);
            me.model.add(curModel, dirModel);
          } else {
            curModel = me.model.getFileByPath(curPath);
          }
          done();
        }], function(err) {
          if (err) {
            alert(err);
          }
        });
      },
      _renameFile: function(file, newName, updateFileSystem, updateModel, updateDom) {},
      _clearFile: function(updateModel, updateDom) {
        if (updateDom) {
          var domId = this._pathToDomId['.'];
          this._fileTree.deleteFile(domId);
        }
        if (updateModel) {
          this.model.addRoot(null);
        }
      },
      _openFile: function(file, updateModel, updateDom) {
        if (updateModel) {
          this.model.get('project').set('openFile', file);
        }
        if (updateDom) {
          var domId = this._pathToDomId[file.get('path')];
          this._fileTree.selectFile(domId);
        }
      },
      _init: function() {
        var me = this;
        var adapter = this._fileTree = new JstreeAdapter(this._$jstree);
        adapter.initContextMenu(function(file) {
          var model = file.data;
          if (file.isDir) {
            return [{
              label: 'create directory',
              action: function() {
                var relPath = path.join(model.get('path'), 'new directory');
                me._addFile(relPath, true, true, true, true);
              }
            }, {
              label: 'create file',
              action: function() {
                var relPath = path.join(model.get('path'), 'new file.md');
                me._addFile(relPath, false, true, true, true);
              }
            }, {
              label: 'delete directory',
              action: function() {
                me._deleteFile(model, true, true, true, true);
              }
            }, {
              label: 'rename',
              action: function() {}
            }];
          } else {
            return [{
              label: 'delete file',
              action: function() {
                me._deleteFile(model, false, true, true, true);
              }
            }, {
              label: 'rename',
              action: function() {}
            }];
          }
        });
      },
      _initWatch: function() {
        var me = this;
        async.series([(function(done) {
          watch2.walkAllFiles(me.model.get('root'), {filter: function(absolutePath, stat) {
              return !/\.git/.test(absolutePath) && !/__pycache__/.test(absolutePath) && !/\.idea/.test(absolutePath);
            }}, function(files) {
            me._createRoot(me.model.get('root'));
            var absolutePaths = Object.keys(files);
            for (var i = 1; i < absolutePaths.length; i++) {
              var absolutePath = absolutePaths[i];
              var relPath = path.relative(me.model.get('root'), absolutePath);
              var stat = files[absolutePath];
              me._addFile(relPath, stat.isDirectory(), false, true, true);
            }
            done();
          });
        }), (function(done) {
          watch.createMonitor(me.model.get('root'), function(monitor) {
            monitor.on('created', function(absolutePath, stat) {
              var relPath = path.relative(me.model.get('root'), absolutePath);
              me._addFile(relPath, stat.isDirectory(), false, true, true);
            });
            monitor.on('changed', function(absolutePath) {});
            monitor.on('removed', function(absolutePath, stat) {
              var relPath = path.relative(me.model.get('root'), absolutePath);
              var model = me.model.getFileByPath(relPath);
              me._deleteFile(model, stat.isDirectory(), false, true, true);
            });
          });
          done();
        })], function() {});
      },
      _initModel: function() {
        this.listenTo(this.model, 'add:files', function(file) {
          var fileAbsPath = file.absolutePath(this.model.get('root'));
          if (file.get('path') == '.') {
            var curDomId = this._fileTree.addFile({
              label: this.model.get('root'),
              isDir: file.get('isDir'),
              data: file
            }, null);
            this._pathToDomId['.'] = curDomId;
          } else {
            var dirDomId = this._pathToDomId[file.dirpath()];
            var curDomId = this._fileTree.addFile({
              label: file.name(),
              isDir: file.get('isDir'),
              data: file
            }, dirDomId);
            this._pathToDomId[file.get('path')] = curDomId;
          }
        });
        this.listenTo(this.model, 'remove:files', function(file) {
          console.log(file);
        });
      },
      initialize: function(options) {
        var $__0 = this;
        var root = loader.loadDom('file-tree', html);
        this.setElement($(root).find('.file-tree'));
        dom.appendStyle(root, css);
        this._projectManager = options.projectManager;
        this._$jstree = this.$('.jstree');
        this._init();
        this._projectManager.on('open', (function(project) {
          $__0.model.set('root', project.get('location'));
          $__0.model.set('project', project);
          $__0._initModel();
          $__0._initWatch();
        }));
        this._projectManager.on('close', (function() {
          $__0.stopListening();
          watch.unwatchTree($__0.model.get('root'));
          $__0._clearFile(true, true);
        }));
      }
    });
    return FileTreeView;
  });
  return {};
})();
//# sourceMappingURL=file-tree-view.js.map
