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
	var dom = require('../utility/dom')
	var html = require('html!./index')
	var style = require('style!./index')


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
				//this._createProjectDialogView = new CreateProjectDialogView({
				//	projectManager: this._projectManager
				//})
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
			this._projectManager = options.projectManager

			this.setElement(loader.loadDom('top-nav', html))
			dom.appendStyle(this.$el[0], style)

			new HoverToPopInGroup({
				$buttons: [this.$('.git'), this.$('.about'), this.$('.file')],
				$menus: [
					this.$('.git-menu').menu().hide(),
					this.$('.about-menu').menu().hide(),
					this.$('.file-menu').menu().hide()
				]
			})
		}
	})

	return TopNavView
})