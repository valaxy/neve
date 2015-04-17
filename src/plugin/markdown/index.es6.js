define(function (require, exports) {
	var LinearLayout = require('bower_components/jquery-flex-layout/src/view/linear-layout')
	var SimpleView = require('bower_components/jquery-flex-layout/src/view/simple-view')
	var async = require('async')
	var markdown = require('bundle!marked')

	var loader = require('../../loader/index')
	var layout = require('../../home/layout')
	var EditorView = require('../../editor/editor')
	var fileWatcherLoader = require('../../loader/file-watcher-loader')
	var layoutLoader = require('../../loader/layout-loader')

	exports.init = function (options) {
		this._editorView = options.editorView
		this._projectManager = options.projectManager

		layoutLoader.load()

		//var editor = new SimpleView({selector: $(this._editorView.$el)})
		//layout.load('editor', editor._$dom)

		this._projectManager.on('open', function () {
			// show view
		})

		this._projectManager.on('close', function () {
			// hide view
		})

		fileWatcherLoader.load({
			name: 'markdown',
			description: 'compile markdown to html',
			script: (input, callback) => {
				var $preview = $('.preview .content')
				var html = markdown(input)

				// recover the scroll postion
				var top = $preview[0].scrollTop
				$preview.html(html)
				$preview[0].scrollTop = top
				callback()
			}
		})
	}
})