define(function (require) {
	var ItemModel = require('./item-model')

	var EditorTabModel = Backbone.Relational.extend({
		relations: [{
			type: Backbone.HasMany,
			key: 'tabs',
			relatedModel: ItemModel,
			reverseRelation: {
				type: Backbone.HasOne
			}
		}],

		closeAllFile: function () {

		}
	})

	return EditorTabModel
})