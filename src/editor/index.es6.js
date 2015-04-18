define(function (require, exports) {
	var EditorView = require('./editor')
	var layout = require('../window/layout')

	exports.init = function (options) {
		var projectManager = options.projectManager

		var editorView = new EditorView({
			projectManager: projectManager
		})

		layout.load2(editorView.el, function () {
			console.log('should dispose me')
		})
	}
})