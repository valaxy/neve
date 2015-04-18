define(function (require) {
	var fs = requireNode('fs')
	var g = require('../home/global')
	var $ = require('jquery')
	var ace = require('ace')
	var loader = require('../loader/index')
	var autoSave = require('./plugin/auto-save')

	var dom = require('../utility/dom')
	var html = require('html!./index')
	var css = require('style!./index')


	var Editor = Backbone.View.extend({
		_onOpenFile: function (project, file) {
			this.$el.show()
			var content = fs.readFileSync(file.absolutePath(project.get('location')), {
				encoding: 'utf-8'
			})

			this._editor.setValue(content)
		},

		_onCloseFile: function (project, file) {
			this.$el.hide()
		},

		initialize: function (options) {
			this.setElement($(html))
			dom.appendStyle(this.el, css)


			var projectManager = options.projectManager
			var editor = g.editor = ace.edit(this.$('.ace')[0])
			this._editor = editor

			editor.setTheme("ace/theme/chrome") // this bug
			editor.getSession().setMode("ace/mode/markdown")
			editor.renderer.setShowGutter(false)


			// fix about ace editor-------------------------------------
			var style1 = document.getElementById('ace_editor')
			var style2 = document.getElementById('ace-tm')
			var style3 = style2.nextSibling
			this.el.appendChild(style1)
			this.el.appendChild(style2)
			this.el.appendChild(style3)

			// fix about css
			setTimeout(() => {
				var style4 = document.getElementById('ace-chrome')
				this.el.appendChild(style4)
			}, 100)
			// fix about ace editor-------------------------------------


			// bind event when open a file in project
			projectManager.on('openFile', (project, file) => {
				if (file) {
					this._onOpenFile(project, file)
				} else {
					this._onCloseFile(project, file)
				}
			})

			autoSave.init({
				projectManager: projectManager
			})
		}
	})

	return Editor
})