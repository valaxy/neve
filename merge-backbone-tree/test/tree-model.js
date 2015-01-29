define(function (require) {
	var TreeModel = require('src/tree-model')
	var NodeModel = require('src/node-model')

	QUnit.test('getByCid()', function (assert) {
		var tree = new TreeModel
		var n1 = new NodeModel
		var n2 = new NodeModel
		var id1 = tree.add(n1, null)
		var id2 = tree.add(n2, null)

		assert.equal(tree.get('nodes').get(id1), n1)
		assert.equal(tree.get('nodes').get(id2), n2)
	})

	QUnit.test('add()', function (assert) {
		var tree = new TreeModel
		assert.equal(tree.get('nodes').length, 0)

		var n1 = new NodeModel
		tree.add(n1)
		assert.equal(tree.get('nodes').length, 1)
		assert.ok(!n1.get('parent'))

		var n2 = new NodeModel
		tree.add(n2, n1)
		assert.equal(tree.get('nodes').length, 2)
		assert.ok(n2.get('parent'), n1)

		var n3 = new NodeModel
		tree.add(n3, n1)
		assert.equal(tree.get('nodes').length, 3)
		assert.ok(n3.get('parent'), n1)
	})


	QUnit.test('remove()', function (assert) {
		var tree = new TreeModel
		var n1 = new NodeModel
		var n2 = new NodeModel
		var n3 = new NodeModel
		var n4 = new NodeModel
		tree.add(n1)
		tree.add(n2, n1)
		tree.add(n3, n1)
		tree.add(n4, n2)
		assert.equal(tree.get('nodes').length, 4)

		tree.remove(n4) // remove leaf
		assert.equal(tree.get('nodes').length, 3)

		tree.remove(n1)
		assert.equal(tree.get('nodes').length, 0)
	})
})