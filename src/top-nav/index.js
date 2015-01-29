define(function (require) {
	var path = requireNode('path')

	require('magnific-popup')
	var $ = require('jquery')
	var g = require('../home/global')
	var MenuPopup = require('./menu-popup')
	var MenuAssociate = require('./menu-associate')
	var CreateProjectDialogView = require('../create-project-dialog/view')


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
		initialize: function (options) {
			var m1 = new MenuPopup({
				$button: $('.git'),
				$menu: $('.git-menu').menu().hide()
			})

			var m2 = new MenuPopup({
				$button: $('.about'),
				$menu: $('.about-menu').menu().hide()
			})

			var m3 = new MenuPopup({
				$button: $('.file'),
				$menu: $('.file-menu').menu().hide()
			})

			new MenuAssociate({
				menuPopups: [m1, m2, m3]
			})

			new CreateProjectDialogView({
				el: this.$('.create-project-dialog'),
				projectManager: options.projectManager
			})
		}
	})

	return TopNavView
})