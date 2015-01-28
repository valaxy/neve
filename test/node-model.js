define(function (require) {
	var NodeModel = require('src/node-model')

	QUnit.module('NodeModel')

	QUnit.test('addChild()/cut()/parent/children', function (assert) {
		var root = new NodeModel
		assert.equal(root.get('children').length, 0)

		var n1 = new NodeModel
		var n2 = new NodeModel
		var n3 = new NodeModel
		root.addChild(n1, n2)
		assert.equal(n2.addChild(n3), n2)

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

	QUnit.test('isLeaf()', function (assert) {
		var root = new NodeModel
		assert.ok(root.isLeaf())

		var n1 = new NodeModel
		root.addChild(n1)
		assert.ok(!root.isLeaf())
		assert.ok(n1.isLeaf())
	})

})