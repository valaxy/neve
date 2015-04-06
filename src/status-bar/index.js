define(function (require) {
	var loader = require('../loader/index')
	var html = require('text!./index.html')
	var css = require('style!./index')
	var dom = require('../utility/dom')

	var StatusBar = Backbone.View.extend({
		initialize: function () {
			this.setElement(loader.loadDom('status-bar', html))
			dom.appendStyle(this.$el[0], css)
		}
	})

	return StatusBar
})