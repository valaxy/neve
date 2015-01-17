define(function (require, exports) {
	var g = require('../home/global')
	var editorWatch = require('./editor-watch')

	_.extend(exports, Backbone.Events)

	exports.init = function () {
		editorWatch.on('update', function (done, text) {
			g.fileTree.saveOpen(text)
			console.log('save ok')
			exports.trigger('save')
			done()
		})
	}


})