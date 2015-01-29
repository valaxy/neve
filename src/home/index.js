define(function (require, exports) {
	var path = requireNode('path')
	//var nodegit = requireNode('../../node_modules/nodegit/lib/nodegit')

	var process = require('../process/process')
	var FileTreeView = require('../file-tree/file-tree-view')
	var FileTreeModel = require('../file-tree/file-tree-model')
	var TopNavView = require('../top-nav/index')
	var g = require('./global')
	var Editor = require('../editor/editor')
	var layout = require('./layout')
	var autoSave = require('../editor/auto-save')
	var saveConfirm = require('../editor/save-confirm')
	var ProjectManager = require('../project-manager/project-manager')
	var ProjectModel = require('../project-manager/project-model')


	exports.init = function () {
		var projectManager = g.projectManager = new ProjectManager

		layout.init()

		new Editor({
			projectManager: projectManager
		})

		// the file tree
		g.fileTree = (new FileTreeView({
			model: new FileTreeModel,
			el: $('.explorer'),
			projectManager: g.projectManager
		})).model

		process.init()

		new TopNavView({
			projectManager: projectManager
		})

		autoSave.init({
			projectManager: projectManager
		})

		saveConfirm.init()

		g.projectManager.open(new ProjectModel({
			name: 'CF',
			location: 'd:/CodeForces'
		}))
	}
})

