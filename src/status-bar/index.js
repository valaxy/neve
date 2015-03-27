define(function (require) {
	var loader = require('../loader/index')
	var html = require('text!./index.html')
	require('css!./index')

	var StatusBar = Backbone.View.extend({
		initialize: function () {
			this.setElement(loader.loadHTML(html))
		}
	})

	return StatusBar
})