define(function (require, exports) {
	var EditorView = require('./editor')
	var layout = require('../window/layout')

	var editorView

	exports.init = function (options) {
		var projectManager = options.projectManager

		editorView = new EditorView({
			projectManager: projectManager
		})

		layout.load2(editorView.el, function () {
			console.log('should dispose me')
		})
	}


	/** ACE editro */
	exports.getEditor = function () {
		return editorView._editor
	}
})