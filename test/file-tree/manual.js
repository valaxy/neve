define(function (require, exports) {
	var FileTreeModel = require('src/file-tree/file-tree-model')
	var FileTreeView = require('src/file-tree/file-tree-view')
	var ProjectManager = require('src/project-manager/project-manager')
	var ProjectModel = require('src/project-manager/project-model')
	var $ = require('jquery')

	exports.init = function () {
		var manager = new ProjectManager

		// the file tree
		var view = (new FileTreeView({
			model: new FileTreeModel,
			el: $('.explorer'),
			projectManager: manager
		}))


		view.on('selectFile', function (file) {
			alert('selectFile: ' + file.get('path'))
		})

		view.on('selectDirectory', function (dir) {
			alert('selectDir: ' + dir.get('path'))
		})

		manager.open(new ProjectModel({
			name: 'CF',
			location: 'd:/CodeForces'
		}))
	}

})