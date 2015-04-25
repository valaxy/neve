define(function (require) {
	var Backbone = require('backbone')

	var WindowView = Backbone.View.extend({
		events: {
			'click close': function () {
				alert('close me')
			}
		}
	})

	return WindowView
})