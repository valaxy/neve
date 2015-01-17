define(function (require) {
	var FileTreeModel = require('src/file-tree/file-tree-model')
	var FileModel = require('src/file-tree/file-model')

	QUnit.module('FileModel')

	QUnit.test('name()/dirpath()', function (assert) {
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

	QUnit.test('rename()', function (assert) {
		var file = new FileModel({
			path: 'a/b/c.md'
		})
		assert.equal(file.rename('xxx'), true)
		assert.equal(file.get('path'), 'a/b/xxx')

		assert.equal(file.rename(''), false)
	})

	QUnit.test('absolutePath()', function (assert) {
		var file = new FileModel({path: 'a/b'})
		var ftree = new FileTreeModel({
			root: 'd:/'
		})
		ftree.add(file)
		assert.equal(file.absolutePath(), 'd:/a/b')
	})
})