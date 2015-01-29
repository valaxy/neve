define(function (require) {
	var FileTreeModel = require('src/file-tree/file-tree-model')
	var FileModel = require('src/file-tree/file-model')

	module('FileTreeModel')

	test('getByCid()', function (assert) {
		var tree = new FileTreeModel
		var n1 = new FileModel
		var n2 = new FileModel
		var id1 = tree.add(n1, null)
		var id2 = tree.add(n2, null)

		assert.equal(tree.get('files').get(id1), n1)
		assert.equal(tree.get('files').get(id2), n2)
	})

	test('add()', function (assert) {
		var tree = new FileTreeModel
		assert.equal(tree.get('files').length, 0)

		var n1 = new FileModel
		tree.add(n1)
		assert.equal(tree.get('files').length, 1)
		assert.ok(!n1.get('parent'))

		var n2 = new FileModel
		tree.add(n2, n1)
		assert.equal(tree.get('files').length, 2)
		assert.ok(n2.get('parent'), n1)

		var n3 = new FileModel
		tree.add(n3, n1)
		assert.equal(tree.get('files').length, 3)
		assert.ok(n3.get('parent'), n1)
	})


	test('remove()', function (assert) {
		var tree = new FileTreeModel
		var n1 = new FileModel
		var n2 = new FileModel
		var n3 = new FileModel
		var n4 = new FileModel
		tree.add(n1)
		tree.add(n2, n1)
		tree.add(n3, n1)
		tree.add(n4, n2)
		assert.equal(tree.get('files').length, 4)

		tree.remove(n4) // remove leaf
		assert.equal(tree.get('files').length, 3)

		tree.remove(n1)
		assert.equal(tree.get('files').length, 0)
	})
})