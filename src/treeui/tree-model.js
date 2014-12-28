define(function (require) {

	var NodeModel = require('./node-model')

	var TreeModel = Backbone.RelationalModel.extend({
		relations: [{
			key: 'nodes',
			type: Backbone.HasMany,
			relatedModel: NodeModel,
			reverseRelation: {
				key: 'tree'
			}
		}],

		add: function (child, parent) {
			this.get('nodes').add(child)
			if (parent) {
				parent.get('children').add(child)
			}
		},

		remove: function (node) {
			if (node.isLeaf()) {
				this.removeLeaf(node)
			} else {
				this.get('nodes').remove(node)
				var me = this
				node.get('children').forEach(function (child) {
					me.remove(child)
				})
			}
		},

		removeLeaf: function (leaf) {
			this.get('nodes').remove(leaf)
			if (leaf.get('parent')) {
				leaf.get('parent').get('children').remove(leaf)
			}
		}
	})

	if (typeof QUnit != 'undefined') {

		QUnit.test('TreeModel:add', function (assert) {
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
		})

		QUnit.test('TreeModel:removeLeaf', function (assert) {
			var tree = new TreeModel
			var n1 = new NodeModel
			var n2 = new NodeModel
			tree.add(n1)
			tree.add(n2, n1)
			assert.equal(tree.get('nodes').length, 2)
			assert.equal(n1.get('children').length, 1)

			tree.removeLeaf(n2)
			assert.equal(tree.get('nodes').length, 1)
			assert.equal(n1.get('children').length, 0)

			tree.removeLeaf(n1)
			assert.equal(tree.get('nodes').length, 0)
		})

		QUnit.test('TreeModel:remove', function (assert) {
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

			tree.remove(n1)
			assert.equal(tree.get('nodes').length, 0)
		})

	}

	return TreeModel
})