define(function (require) {
	require('css!./index')
	require('css!bower_components/css-loading-spinners/css/load3')

	var Backbone = require('backbone')
	var html = require('text!./index.html')
	var loader = require('../loader/index')

	var Loading = Backbone.View.extend({
		show: function () {
			this.$el.show()
		},
		dispose: function () {
			var me = this
			this.$el.fadeOut(500, function () {
				me.$el.remove()
			})
		},
		initialize: function () {
			this.setElement(loader.loadHTML(html))
			$('.everything').after(this.$el)
		}
	})

	return Loading
})