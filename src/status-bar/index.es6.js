define(function (require) {
	var loader = require('../loader/index')
	var dom = require('../utility/dom')

	// resources
	var html = require('html!./index')
	var css = require('style!./index')

	var StatusBar = Backbone.View.extend({
		events: {
			'click .views': function (e) {
				this.$('.menu').show()
				e.preventDefault()
				return false
			}
		},
		initialize: function () {
			var shadow = loader.loadDom('status-bar', html)
			this.setElement(shadow.querySelectorAll(':first-child')[0])
			dom.appendStyle(shadow, css)

			$(document).click(() => {
				this.$('.menu').hide()
			})
		}
	})

	return StatusBar
})