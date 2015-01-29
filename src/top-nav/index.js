define(function (require) {
	var $ = require('jquery')
	require('magnific-popup')

	var g = require('../home/global')
	var MenuPopup = require('./menu-popup')
	var CreateProjectDialogView = require('../create-project-dialog/view')
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
			},
			'click .new-project': function () {
				$.magnificPopup.open({
					items: {
						src: '.create-project-dialog',
						type: 'inline'
					},
					modal: true
				})
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

			new MenuPopup({
				$button: $('.file'),
				$menu: $('.file-menu').menu().hide()
			})

			new CreateProjectDialogView({
				el: this.$('.create-project-dialog')
			})
		}
	})

	return TopNavView
})