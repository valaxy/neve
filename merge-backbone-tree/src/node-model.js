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

		/** judge if it is a leaf */
		isLeaf: function () {
			return this.get('children').length == 0
		},

		/** add child and return this */
		addChild: function (child /* ... */) {
			for (var i in arguments) {
				var child = arguments[i]
				this.get('children').add(child)
			}
			return this
		},

		/** remove the subtree whose root is this, return this */
		cut: function () {
			if (this.get('parent')) {
				return this.get('parent').get('children').remove(this)
			} else {
				return this
			}
		}
	})


	return NodeModel
})