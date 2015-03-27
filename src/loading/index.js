define(function (require) {
	var Backbone = require('backbone')
	var css = require('css!./index')
	var html = require('text!./index.html')
	var loader = require('../loader/index')

	var Loading = Backbone.View.extend({
		show: function () {
			this.$el.show()
		},
		dispose: function () {
			this.$el.fadeOut(1000, function () {
				this.$el.remove()
			})
		},
		initialize: function () {
			//loader.loadHTML(html)
		}
	})

	return Loading
})