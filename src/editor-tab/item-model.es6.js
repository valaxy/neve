define(function () {

	var ItemModel = Backbone.Model.extend({
		defaults: function () {
			return {
				name: '',
				file: null // file model
			}
		},

		closeFile: function () {

		}
	})

	return ItemModel
})