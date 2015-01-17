define(function () {

	var NodeModel = Backbone.RelationalModel.extend({
		/**
		 * children is the children of node.
		 */

		/**
		 * parent is the parent of node.
		 */
		relations: [{
			key: 'children',
			type: Backbone.HasMany,
			reverseRelation: {
				key: 'parent'
			}
		}],

		isLeaf: function () {
			return this.get('children').length == 0
		},

		/** add child and return this */
		addChild: function (child) {
			this.get('children').add(child)
			return this
		},

		/** remove and return this */
		remove: function () {
			if (this.get('parent')) {
				return this.get('parent').get('children').remove(this)
			} else {
				return this
			}
		}
	})


	if (typeof QUnit != 'undefined') {
		QUnit.module('NodeModel')

		QUnit.test('addChild()/remove()/parent/children', function (assert) {
			var root = new NodeModel
			assert.equal(root.get('children').length, 0)

			var n1 = new NodeModel
			var n2 = new NodeModel
			var n3 = new NodeModel
			root.addChild(n1)
			root.addChild(n2)
			n2.addChild(n3)

			assert.equal(root.get('parent'), null)
			assert.equal(n1.get('parent'), root)
			assert.equal(n2.get('parent'), root)
			assert.equal(n3.get('parent'), n2)
			assert.equal(root.get('children').length, 2)

			n2.remove()
			assert.equal(root.get('children').length, 1)
			assert.equal(n2.get('parent'), null)
		})

	}

	return NodeModel
})