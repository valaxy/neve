define(function (require, exports) {
	var path = requireNode('path')
	//var nodegit = requireNode('../../node_modules/nodegit/lib/nodegit')

	var process = require('../process/process')
	var FileTreeView = require('../file-tree/file-tree-view')
	var FileTreeModel = require('../file-tree/file-tree-model')
	var TopNavView = require('../top-nav/index')
	var g = require('./global')
	var layout = require('./layout')
	var autoSave = require('../editor/auto-save')
	var saveConfirm = require('../editor/save-confirm')
	var ProjectManager = require('../project-manager/project-manager')
	var ProjectModel = require('../project-manager/project-model')
	var Loading = require('../loading/index')
	var StatusBar = require('../status-bar/index')

	var pandocPlugin = require('../pandoc-plugin/index')

	exports.init = function () {
		//var loading = new Loading({
		//	el: $('.project-loading')
		//})
		//setTimeout(function () {
		//	loading.dispose()
		//}, 2000)

		var projectManager = g.projectManager = new ProjectManager

		setTimeout(function () {
			layout.init()
		}, 2000)


		new TopNavView({
			projectManager: projectManager
		})

		new StatusBar

		// the file tree
		g.fileTree = (new FileTreeView({
			model: new FileTreeModel,
			projectManager: projectManager
		})).model

		pandocPlugin.init({
			projectManager: projectManager
		})

		//process.init()

		//autoSave.init({
		//	projectManager: projectManager
		//})
		//
		//saveConfirm.init()

		g.projectManager.open(new ProjectModel({
			name: 'CF',
			location: 'c:/project/help-test'
		}))

		// auto open
		setTimeout(function () {
			var file = g.fileTree.getFileByPath('readme.md')
			g.fileTree.get('project').set('openFile', file)
		}, 1000)
	}
})

