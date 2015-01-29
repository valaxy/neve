define(function (require) {
	var FileTreeModel = require('src/file-tree/file-tree-model')
	var FileModel = require('src/file-tree/file-model')

	module('FileModel')

	test('name()/dirpath()', function (assert) {
		var file = new FileModel({
			path: 'a'
		})
		assert.equal(file.name(), 'a')
		assert.equal(file.dirpath(), '.')

		var file2 = new FileModel({
			path: 'a/b'
		})
		assert.equal(file2.name(), 'b')
		assert.equal(file2.dirpath(), 'a')

		var file3 = new FileModel({
			path: 'a/b/c.md'
		})
		assert.equal(file3.name(), 'c.md')
		assert.equal(file3.dirpath(), 'a/b')
	})

	test('rename()', function (assert) {
		var file = new FileModel({
			path: 'a/b/c.md'
		})
		assert.equal(file.rename('xxx'), true)
		assert.equal(file.get('path'), 'a/b/xxx')

		assert.equal(file.rename(''), false)
	})

	test('absolutePath()', function (assert) {
		var file = new FileModel({path: 'a/b'})
		var ftree = new FileTreeModel({
			root: 'd:/'
		})
		ftree.add(file)
		assert.equal(file.absolutePath(), 'd:/a/b')
	})


	test('addFile()/cut()/parent/children', function (assert) {
		var root = new FileModel
		assert.equal(root.get('children').length, 0)

		var n1 = new FileModel
		var n2 = new FileModel
		var n3 = new FileModel
		root.addFile(n1, n2)
		assert.equal(n2.addFile(n3), n2)

		assert.equal(root.get('parent'), null)
		assert.equal(n1.get('parent'), root)
		assert.equal(n2.get('parent'), root)
		assert.equal(n3.get('parent'), n2)
		assert.equal(root.get('children').length, 2)
		assert.equal(root.get('children').at(0), n1)
		assert.equal(root.get('children').at(1), n2)

		assert.equal(n2.cut(), n2)
		assert.equal(root.get('children').length, 1)
		assert.equal(n2.get('parent'), null)
	})


	test('isLeaf()', function (assert) {
		var root = new FileModel
		assert.ok(root.isLeaf())

		var n1 = new FileModel
		root.addFile(n1)
		assert.ok(!root.isLeaf())
		assert.ok(n1.isLeaf())
	})
})