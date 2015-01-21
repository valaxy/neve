define(function (require) {
	var g = require('../home/global')
	var MenuPopup = require('./menu-popup')
	var path = requireNode('path')

	var TopNavView = Backbone.View.extend({
		el: $('.top-nav'),
		events: {
			'click .close': function () {
				alert('close me')
			},
			'click .save': function () {
				g.fileTree.saveOpen(g.editor.getValue())
				alert('save ok')
			}
		},
		initialize: function () {
			new MenuPopup({
				$button: $('.git'),
				$menu: $('.git-menu').menu().hide()
			})

			new MenuPopup({
				$button: $('.about'),
				$menu: $('.about-menu').menu().hide()
			})
		}
	})

	return TopNavView
})