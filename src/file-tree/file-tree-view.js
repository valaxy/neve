var $__file_45_tree_45_view_46_es6_46_js__ = (function() {
  "use strict";
  var __moduleName = "file-tree-view.es6.js";
  define(function(require) {
    var fs = requireNode('fs');
    var path = requireNode('path');
    var watch = requireNode('watch');
    var fswrap = require('../file-system/fs-wrap');
    var watch2 = new (require('../file-system/watch'));
    var JstreeAdapter = require('./jstree/js-adapter');
    var FileModel = require('../project-manager/file-model');
    var async = require('async');
    var renameDialog = require('./rename-dialog/index');
    require('jstree');
    var loader = require('../loader/index');
    var html = require('text!./index.html');
    var css = require('style!./index');
    var dom = require('../utility/dom');
    var FileTreeView = Backbone.View.extend({
      _pathToDomId: {},
      events: {openFile: function(event, file) {
          this.model.get('project').set('openFile', file);
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
      _createRoot: function() {
        var model = new FileModel({
          path: '.',
          isDir: true
        });
        this.model.addRoot(model);
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
        var $__0 = this;
        var adapter = this._fileTree = new JstreeAdapter(this._$jstree);
        adapter.initContextMenu((function(file) {
          var model = file.data;
          if (file.isDir) {
            return [{
              label: 'create directory',
              action: (function() {
                $__0.model.createFile(new FileModel({
                  path: path.join(model.get('path'), 'new directory'),
                  isDir: true
                }));
              })
            }, {
              label: 'create file',
              action: (function() {
                $__0.model.createFile(new FileModel({
                  path: path.join(model.get('path'), 'new file.md'),
                  isDir: false
                }));
              })
            }, {
              label: 'delete directory',
              action: (function() {
                $__0.model.deleteFile(model);
              })
            }, {
              label: 'rename',
              action: function() {
                renameDialog.init();
                renameDialog.show(model);
              }
            }];
          } else {
            return [{
              label: 'delete file',
              action: (function() {
                $__0.model.deleteFile(model);
              })
            }, {
              label: 'rename',
              action: (function() {
                var domId = $__0._pathToDomId[model.get('path')];
                $__0.listenTo(model, 'change:name', function(model, name) {
                  this._fileTree.renameFile(domId, name);
                });
                renameDialog.show(model);
              })
            }];
          }
        }));
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
              var f = new FileModel({
                path: relPath,
                isDir: stat.isDirectory()
              });
              var dirModel = me.model.getFileByPath(f.get('dirpath'));
              me.model.add(f, dirModel);
            }
            done();
          });
        }), (function(done) {
          watch.createMonitor(me.model.get('root'), function(monitor) {
            monitor.on('created', function(absolutePath, stat) {
              var relPath = path.relative(me.model.get('root'), absolutePath);
              me.model.createFile(new FileModel({
                path: relPath,
                isDir: stat.isDirectory()
              }));
            });
            monitor.on('changed', function(absolutePath) {});
            monitor.on('removed', function(absolutePath, stat) {
              var relPath = path.relative(me.model.get('root'), absolutePath);
              var deletedFile = me.model.getFileByPath(relPath);
              if (deletedFile) {
                me.model.deleteFile(deletedFile);
              }
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
            var dirDomId = this._pathToDomId[file.get('dirpath')];
            var curDomId = this._fileTree.addFile({
              label: file.get('name'),
              isDir: file.get('isDir'),
              data: file
            }, dirDomId);
            this._pathToDomId[file.get('path')] = curDomId;
          }
        });
        this.listenTo(this.model, 'remove:files', function(file) {
          this._fileTree.deleteFile(this._pathToDomId[file.get('path')]);
        });
        this.listenTo(this.model.get('project'), 'change:openFile', function(file) {
          console.log(11111111111111);
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
