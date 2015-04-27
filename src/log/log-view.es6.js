define(function (require) {
	var Backbone = require('backbone')
	var layout = require('../window/layout')
	var dom = require('../utility/dom')
	var html = require('html!./log')
	var css = require('style!./log')

	var LogView = Backbone.View.extend({
		initialize: function () {
			var $dom = layout.load2(html, {
				title   : 'Log',
				position: 'bottom',
				flex    : '0 300px'
			})
			this.setElement($dom)
			dom.appendStyle($dom[0], css)
		},
		append    : function (msg) {
			this.$el.append($('<pre>').html(msg + '\n'))
		}
	})

	return LogView
})