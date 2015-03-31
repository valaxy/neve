define(function (require) {
	require('magnific-popup')
	var $ = require('jquery')
	var g = require('../home/global')
	var CreateProjectDialogView = require('../create-project-dialog/view')
	var fileDialog = require('bower_components/nw-file-dialog/index')
	var ProjectModel = require('../project-manager/project-model')
	var path = require('bower_components/path/path') // todo 奇怪
	var loader = require('../loader/index')
	var HoverToPopInGroup = require('bower_components/jquery-interaction/src/hover-to-pop-in-group')


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
				this._createProjectDialogView.open()
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

			this._createProjectDialogView = new CreateProjectDialogView({
				el: this.$('.create-project-dialog'),
				projectManager: options.projectManager
			})

			this._projectManager = options.projectManager

			//var m1 = new MenuPopup({
			//	$button: $('.git'),
			//	$menu: $('.git-menu').menu().hide()
			//})
			//
			//var m2 = new MenuPopup({
			//	$button: $('.about'),
			//	$menu: $('.about-menu').menu().hide()
			//})
			//
			//var m3 = new MenuPopup({
			//	$button: $('.file'),
			//	$menu: $('.file-menu').menu().hide()
			//})
			//
			//new MenuAssociate({
			//	menuPopups: [m1, m2, m3]
			//})


			new HoverToPopInGroup({
				$buttons: [$('.git'), $('.about'), $('.file')],
				$menus: [
					$('.git-menu').menu().hide(),
					$('.about-menu').menu().hide(),
					$('.file-menu').menu().hide()
				]
			})
		}
	})

	return TopNavView
})