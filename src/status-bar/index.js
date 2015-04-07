define(function (require) {
	var loader = require('../loader/index')
	var dom = require('../utility/dom')

	// resources
	var html = require('html!./index')
	var css = require('style!./index')
	var fontAwsome = require('style!bower_components/font-awesome/css/font-awesome')

	var StatusBar = Backbone.View.extend({
		initialize: function () {
			this.setElement(loader.loadDom('status-bar', html))
			dom.appendStyle(this.$el[0], fontAwsome)
			dom.appendStyle(this.$el[0], css)
		}
	})

	return StatusBar
})