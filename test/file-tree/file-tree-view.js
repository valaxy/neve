var $__file_45_tree_45_view_46_es6_46_js__ = (function() {
  "use strict";
  var __moduleName = "file-tree-view.es6.js";
  define(function(require) {
    var temp = requireNode('temp');
    var fs = requireNode('fs');
    var path = requireNode('path');
    var FileTreeModel = require('src/file-tree/file-tree-model');
    var FileTreeView = require('src/file-tree/file-tree-view');
    var ProjectManager = require('src/project-manager/project-manager');
    var utility = require('../utility');
    var domHtml = require('text!src/file-tree/index.html');
    var Project = require('src/project-manager/project-model');
    var async = require('async');
    var projectManager;
    module('FileTreeView', {beforeEach: function() {
        projectManager = new ProjectManager;
      }});
    test('open a project', function(assert) {
      var done = assert.async();
      var root = utility.createProjectFiles();
      var tree = new FileTreeModel({root: root});
      assert.equal(tree.get('files').length, 0);
      new FileTreeView({
        el: $(domHtml),
        model: tree,
        projectManager: projectManager
      });
      projectManager.open(new Project({
        name: 'test-project',
        location: root
      }));
      setTimeout(function() {
        assert.equal(tree.get('files').length, 5);
        done();
      }, 1000);
    });
    test('open a project and open another project', function(assert) {
      var done = assert.async();
      var view = new FileTreeView({
        el: $(domHtml),
        model: new FileTreeModel,
        projectManager: projectManager
      });
      projectManager.open(new Project({
        name: 'test1',
        location: utility.createProjectFiles()
      }));
      projectManager.open(new Project({
        name: 'test2',
        location: utility.createProjectFiles()
      }));
      assert.ok(true);
      done();
    });
    test('delta change about creating', function(assert) {
      var done = assert.async();
      var rootdir = temp.mkdirSync('case');
      var tree = new FileTreeModel({root: rootdir});
      new FileTreeView({
        el: $(domHtml),
        model: tree,
        projectManager: projectManager
      });
      projectManager.open(new Project({
        name: 'test-project',
        location: rootdir
      }));
      async.series([function(callback) {
        setTimeout(function() {
          assert.equal(tree.get('files').length, 1);
          callback();
        }, 500);
      }, function(callback) {
        setTimeout(function() {
          fs.writeFileSync(path.join(rootdir, '1'), '1');
          callback();
        }, 3000);
      }, function(callback) {
        setTimeout(function() {
          assert.equal(tree.get('files').length, 2);
          callback();
        }, 3000);
      }], function() {
        done();
      });
    });
  });
  return {};
})();
//# sourceMappingURL=file-tree-view.js.map
