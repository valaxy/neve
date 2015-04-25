var $__file_45_model_46_es6_46_js__ = (function() {
  "use strict";
  var __moduleName = "file-model.es6.js";
  define(function(require) {
    var FileTreeModel = require('src/project-manager/file-tree-model');
    var FileModel = require('src/project-manager/file-model');
    QUnit.module('FileModel');
    QUnit.test('rename()', function(assert) {
      var file = new FileModel({path: 'a/b/c.md'});
      assert.equal(file.rename('xxx'), true);
      assert.equal(file.get('path'), 'a/b/xxx');
      assert.equal(file.rename(''), false);
    });
    QUnit.test('absolutePath()', function(assert) {
      var file = new FileModel({path: 'a/b'});
      var ftree = new FileTreeModel({root: 'd:/'});
      ftree.addRoot(file);
      assert.equal(file.absolutePath(), 'd:/a/b');
    });
    QUnit.test('addFile()/cut()/parent/children', function(assert) {
      var root = new FileModel;
      assert.equal(root.get('children').length, 0);
      var n1 = new FileModel;
      var n2 = new FileModel;
      var n3 = new FileModel;
      root.addFile(n1, n2);
      assert.equal(n2.addFile(n3), n2);
      assert.equal(root.get('parent'), null);
      assert.equal(n1.get('parent'), root);
      assert.equal(n2.get('parent'), root);
      assert.equal(n3.get('parent'), n2);
      assert.equal(root.get('children').length, 2);
      assert.equal(root.get('children').at(0), n1);
      assert.equal(root.get('children').at(1), n2);
      assert.equal(n2.cut(), n2);
      assert.equal(root.get('children').length, 1);
      assert.equal(n2.get('parent'), null);
    });
    QUnit.test('isLeaf()', function(assert) {
      var root = new FileModel;
      assert.ok(root.isLeaf());
      var n1 = new FileModel;
      root.addFile(n1);
      assert.ok(!root.isLeaf());
      assert.ok(n1.isLeaf());
    });
    QUnit.test('name()', function(assert) {
      assert.equal(new FileModel({path: '.'}).name(), '.');
      assert.equal(new FileModel({path: 'a'}).name(), 'a');
      assert.equal(new FileModel({path: 'a/b'}).name(), 'b');
      assert.equal(new FileModel({path: 'a/b/c.md'}).name(), 'c.md');
    });
    QUnit.test('nameWithoutExtension()', function(assert) {
      assert.equal(new FileModel({path: '.'}).nameWithoutExtension(), '.');
    });
    QUnit.test('dirpath()', function(assert) {
      assert.equal(new FileModel({path: '.'}).dirpath(), '.');
      assert.equal(new FileModel({path: 'aa'}).dirpath(), '.');
      assert.equal(new FileModel({path: 'aa/bb'}).dirpath(), 'aa');
      assert.equal(new FileModel({path: 'aa/bb/cc'}).dirpath(), 'aa/bb');
      assert.equal(new FileModel({path: 'aa/bb/../cc'}, {parse: true}).dirpath(), 'aa');
      assert.equal(new FileModel({path: './aa/bb'}, {parse: true}).dirpath(), 'aa');
      assert.equal(new FileModel({path: 'aa/bb.md'}).dirpath(), 'aa');
    });
    QUnit.test('dirname()', function(assert) {
      assert.equal(new FileModel({path: '.'}).dirname(), '.');
      assert.equal(new FileModel({path: 'aa'}).dirname(), '.');
      assert.equal(new FileModel({path: 'aa/bb'}).dirname(), 'aa');
      assert.equal(new FileModel({path: 'aa/bb/cc'}).dirname(), 'bb');
    });
  });
  return {};
})();
//# sourceMappingURL=file-model.js.map
