define(function (require) {
	var FileTreeModel = require('src/project-manager/file-tree-model')
	var FileModel = require('src/project-manager/file-model')

	QUnit.module('FileTreeModel')

	test('get("files").get(id)', function (assert) {
		var tree = new FileTreeModel
		var n1 = new FileModel({
			path: '1'
		})
		var n2 = new FileModel({
			path: '2'
		})
		var id1 = tree.addRoot(n1)
		var id2 = tree.add(n2, n1)


		assert.equal(tree.get('files').get(id1), n1)
		assert.equal(tree.get('files').get(id2), n2)
	})


	test('getFileByPath()', function (assert) {
		var tree = new FileTreeModel
		var file = new FileModel({
			path: 'a/b'
		})
		tree.addRoot(file)
		assert.equal(tree.getFileByPath('a/b'), file)
	})


	test('add()', function (assert) {
		var tree = new FileTreeModel
		assert.equal(tree.get('files').length, 0)

		var n1 = new FileModel({
			path: '1'
		})
		tree.addRoot(n1)
		assert.equal(tree.get('files').length, 1)
		assert.ok(!n1.get('parent'))

		var n2 = new FileModel({
			path: '2'
		})
		tree.add(n2, n1)
		assert.equal(tree.get('files').length, 2)
		assert.equal(n2.get('parent'), n1)

		var n3 = new FileModel({
			path: '3'
		})
		var n3id = tree.add(n3, n1)
		assert.equal(tree.get('files').length, 3)
		assert.equal(n3.get('parent'), n1)
		assert.equal(tree.get('files').get(n3id), n3)
	})


	test('addRoot(): add to empty tree', function (assert) {
		var tree = new FileTreeModel
		assert.equal(tree.get('rootDir'), null)

		var root = new FileModel({
			path: 'abc'
		})
		tree.addRoot(root)
		assert.equal(tree.getFileByPath('abc'), root)
		assert.equal(tree.get('rootDir'), root)
		assert.equal(tree.get('files').length, 1)
	})

	test('addRoot(): add to no empty tree', function (assert) {
		var tree = new FileTreeModel
		var f1 = new FileModel({
			path: '.'
		})
		var f2 = new FileModel({
			path: 'a'
		})
		var f3 = new FileModel({
			path: '.'
		})
		tree.addRoot(f1)
		tree.add(f2, f1)
		tree.addRoot(f3)
		assert.equal(tree.getFileByPath('.'), f3)
		assert.equal(tree.get('rootDir'), f3)
		assert.equal(tree.get('files').length, 1)
	})


	test('remove()', function (assert) {
		var tree = new FileTreeModel
		var n1 = new FileModel({
			path: '1'
		})
		var n2 = new FileModel({
			path: '2'
		})
		var n3 = new FileModel({
			path: '3'
		})
		var n4 = new FileModel({
			path: '4'
		})
		tree.addRoot(n1)
		tree.add(n2, n1)
		tree.add(n3, n1)
		tree.add(n4, n2)
		assert.equal(tree.get('files').length, 4)

		tree.remove(n4) // remove leaf
		assert.equal(tree.get('files').length, 3)
		assert.equal(tree.getFileByPath('4'), null)

		tree.remove(n1)
		assert.equal(tree.get('files').length, 0)
		assert.equal(tree.getFileByPath('1'), null)
		assert.equal(tree.getFileByPath('2'), null)
		assert.equal(tree.getFileByPath('3'), null)
	})
})