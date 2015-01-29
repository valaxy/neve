define(function (require) {

	var NodeModel = require('./node-model')

	var TreeModel = Backbone.RelationalModel.extend({
		/** nodes */
		relations: [{
			key: 'nodes',
			type: Backbone.HasMany,
			relatedModel: NodeModel,
			reverseRelation: {
				key: 'tree'
			}
		}],

		/**
		 * add root or add a child of parent, return the cid of child
		 * @param child
		 * @param parent can be optional
		 */
		add: function (child, parent) {
			this.get('nodes').add(child)
			if (parent) {
				parent.addChild(child)
			}
			return child.cid
		},

		/**
		 * remove the subtree whose root is node, return the node
		 * @param node the node matains the subtree structure
		 */
		remove: function (node) {
			this.get('nodes').remove(node)
			node.cut()
			var me = this
			node.get('children').forEach(function (child) {
				me._cut(child)
			})
			return node
		},

		_cut: function (node) {
			this.get('nodes').remove(node)
			var me = this
			node.get('children').forEach(function (child) {
				me._cut(child)
			})
		}
	})
	
	return TreeModel
})