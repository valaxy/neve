define(function (require) {
	var fs = requireNode('fs')
	var g = require('../home/global')
	var $ = require('jquery')
	var process = require('../process/process')

	var Editor = Backbone.View.extend({
		initialize: function (options) {
			var projectManager = options.projectManager

			var editor = g.editor = ace.edit($('.editor .ace')[0])
			editor.getSession().setMode("ace/mode/javascript")
			editor.setTheme("ace/theme/github") // this bug
			editor.renderer.setShowGutter(false)

			var me = this
			projectManager.on('open', function (project) {
				// change the editor value when open a file
				me.listenTo(project, 'change:openFile', function (collection, file) {
					var content = fs.readFileSync(file.absolutePath(project.get('root')), {
						encoding: 'utf-8'
					})
					g.editor.setValue(content)
					process.immediate()
				})
			})

			projectManager.on('close', function (project) {
				me.stopListening(project)
			})
		}

	})

	return Editor
})