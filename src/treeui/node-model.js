define(function (require) {

	var NodeModel = Backbone.RelationalModel.extend({
		defaults: {
			name: '' // display in ui
		},

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