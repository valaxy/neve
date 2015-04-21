define(function (require) {
	var loader = require('../loader/index')
	var dom = require('../utility/dom')
	var layout = require('../window/layout')
	var _ = require('underscore')
	var mustache = require('mustache')
	var menuHTML = require('html!./menu')


	// resources
	var html = require('html!./view')
	var css = require('style!./view')

	var StatusBar = Backbone.View.extend({
		events: {
			'click .views': function (e) {
				var list = _.map(layout.getWindows(), function (win) {
					return {
						name: win.model.get('name'),
						icon: win.model.get('icon')
					}
				})
				var $menu = $(mustache.render(menuHTML, {
					list: list
				}))

				this.$('.menu').remove()
				this.$el.append($menu.show())

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
		},

		renderList: function () {

		}
	})

	return StatusBar
})