define(function (require) {
	var Backbone = require('backbone')

	var Loading = Backbone.View.extend({
		show: function () {
			this.$el.show()
		},
		dispose: function () {
			this.$el.remove()
		}
	})

	return Loading
})