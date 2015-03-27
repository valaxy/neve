define(function (require) {
	require('magnific-popup')
	var $ = require('jquery')
	var g = require('../home/global')
	var MenuPopup = require('./menu-popup')
	var MenuAssociate = require('./menu-associate')
	var CreateProjectDialogView = require('../create-project-dialog/view')
	var fileDialog = require('bower_components/nw-file-dialog/index')
	var ProjectModel = require('../project-manager/project-model')
	var path = requireNode('path')
	var loader = require('../loader/index')


	var html = require('text!./index.html')
	var css = require('css!./index')


	var TopNavView = Backbone.View.extend({
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
			},
			'click .open-project': function () {
				var me = this
				fileDialog.openDir({}, function (path) {
					var project = new ProjectModel({
						name: 'xxxxdddd',
						location: path
					})
					me._projectManager.open(project)
				})
			}
		},
		initialize: function (options) {
			this.setElement(loader.loadHTML(html))

			this._projectManager = options.projectManager

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