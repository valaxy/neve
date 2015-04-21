define(function (require) {
	var Backbone = require('backbone')

	var Window = Backbone.Model.extend({
		defaults: function () {
			return {
				icon: '',
				name: ''
			}
		}
	})

	return Window
})