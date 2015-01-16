define(function (require, exports) {
	var g = require('../home/global')
	var editorWatch = require('./editor-watch')

	exports.init = function () {
		editorWatch.on('update', function (done, text) {
			g.fileTree.saveOpen(text)
			done()
			console.log('save ok')
		})
	}

})