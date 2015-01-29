define(function (require, exports) {
	var g = require('../home/global')
	var editorWatch = require('./editor-watch')

	_.extend(exports, Backbone.Events)

	exports.init = function (options) {
		var projectManager = options.projectManager

		editorWatch.on('update', function (done, text) {
			//g.fileTree.saveOpen(text)
			if (projectManager.active() && projectManager.active().get('openFile')) {
				projectManager.active().saveOpen(text)
			}
			console.log('save ok')
			exports.trigger('save')
			done()
		})
	}


})