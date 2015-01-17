define(function (require, exports) {
	var path = requireNode('path')

	var process = require('../process/process')
	var TreeView = require('../file-tree/file-tree-view')
	var FileTreeModel = require('../file-tree/file-tree-model')
	var TopNavView = require('../top-nav/index')
	var g = require('./global')
	var editor = require('../editor/editor')
	var layout = require('./layout')
	var autoSave = require('../editor/auto-save')
	var saveConfirm = require('../editor/save-confirm')


	exports.init = function () {
		layout.init()

		editor.init()

		// the file tree
		g.fileTree = (new TreeView({
			model: new FileTreeModel({
				root: 'f://test'
			}),
			el: $('.jstree')
		})).model

		process.init()

		new TopNavView

		autoSave.init()
		saveConfirm.init()
	}
})

