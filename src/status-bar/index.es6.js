define(function (require) {
	var loader = require('../loader/index')
	var dom = require('../utility/dom')

	// resources
	var html = require('html!./index')
	var css = require('style!./index')
	var fontAwsome = require('style!bower_components/font-awesome/css/font-awesome')

	var StatusBar = Backbone.View.extend({
		events: {
			'click .views': function () {
				alert('haha')
			}
		},
		initialize: function () {
			var shadow = loader.loadDom('status-bar', html)
			this.setElement(shadow.querySelectorAll(':first-child')[0])
			dom.appendStyle(shadow, fontAwsome)
			dom.appendStyle(shadow, css)
		}
	})

	return StatusBar
})