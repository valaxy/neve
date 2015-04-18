define(function (require, exports) {
	var editorWatch = require('./../editor-watch')
	var fs = requireNode('fs')

	_.extend(exports, Backbone.Events)

	exports.init = function (options) {
		var projectManager = options.projectManager

		editorWatch.on('update', function (done, text) {
			//if (projectManager.active() && projectManager.active().get('openFile')) {
			//	projectManager.active().saveOpen(text)
			//}
			//console.log('save ok')
			//exports.trigger('save')
			//done()

			var project = projectManager.active()
			var file = project.get('openFile')
			if (file) {
				var absolutePath = file.absolutePath(project.get('location'))
				fs.writeFile(absolutePath, text, function (err) {
					if (err) {
						console.error(err)
					}
					console.log('auto save')
				})
				exports.trigger('save')
			}

			done()
		})
	}


})