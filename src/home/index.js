define(function (require, exports) {
	var path = requireNode('path')
	//var nodegit = requireNode('../../node_modules/nodegit/lib/nodegit')

	var g = require('./global')
	var layout = require('./layout')
	var ProjectManager = require('../project-manager/project-manager')
	var ProjectModel = require('../project-manager/project-model')
	var Loading = require('../loading/index')
	var pandocPlugin = require('../pandoc-plugin/index')
	var loader = require('../loader/index')

	require('css!./index')
	require('css!bower_components/normalize.css/normalize.css')


	exports.init = function () {
		var loading = new Loading

		var projectManager = g.projectManager = new ProjectManager

		$.when(
			loader.load('../status-bar/index').done(function (StatusBar) {
				new StatusBar
			}),
			loader.load('../top-nav/index').done(function (TopNavView) {
				new TopNavView({
					projectManager: projectManager
				})
			}),
			loader.load('../file-tree/file-tree-view', '../file-tree/file-tree-model').done(function (FileTreeView, FileTreeModel) {
				g.fileTree = (new FileTreeView({
					model: new FileTreeModel,
					projectManager: projectManager
				})).model
			})
		).done(function () {
				layout.init()
				loading.dispose()

				pandocPlugin.init({
					projectManager: projectManager
				})
				
				g.projectManager.open(new ProjectModel({
					name: 'CF',
					location: 'c:/project/help-test'
				}))

				// auto open
				setTimeout(function () {
					var file = g.fileTree.getFileByPath('readme.md')
					g.fileTree.get('project').set('openFile', file)
				}, 500)
			})
	}
})

