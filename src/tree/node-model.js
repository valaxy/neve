define(function () {

	/**
	 * NodeModel used in TreeModel
	 * attribute value is a the in fact value of NodeModel
	 */
	var NodeModel = Backbone.RelationalModel.extend({

		relations: [{
			key: 'children',
			type: Backbone.HasMany,
			reverseRelation: {
				key: 'parent'
			}
		}],

		isLeaf: function () {
			return this.get('children').length == 0
		}
	})

	return NodeModel
})