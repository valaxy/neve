define(function (require, exports) {
	var EditorView = require('./editor')
	var layout = require('../window/layout')
	var dom = require('../utility/dom')
	var hub = require('../project-manager/event-hub')

	var editorViews = []

	exports.init = function (options) {
		var projectManager = options.projectManager
		var lis = hub.createListener()
		aceShim.init()

		var editorView = new EditorView({
			projectManager: projectManager
		})
		editorViews.push(editorView)

		layout.load2(editorView.el, {
			title  : 'Editor',
			icon   : 'fa fa-paragraph',
			flex   : '1',
			dispose: function () {
				console.log('should dispose me')
			}
		})

		lis.listenTo(hub, 'file:open', function (file) {

		})

	}


	/** ACE editro */
	exports.getEditor = function () {
		return editorViews[0]._editor
	}
})