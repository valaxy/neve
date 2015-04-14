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
		this._projectManager = options.projectManager

		layoutLoader.load()

		loader.load('html!../editor/index',
			'html!../preview/index',
			'html!../editor-tab/index').done(function (editorHTML, previewHTML, editorTabHTML) {
				var linear = new LinearLayout({direction: 'column'})
				var linear2 = new LinearLayout({direction: 'row'})
				var editor = new SimpleView({selector: $(editorHTML)})
				var preview = new SimpleView({selector: $(previewHTML)})
				var editorTab = new SimpleView({selector: $(editorTabHTML)})
				linear2.appendView(editor, {flex: 1})
				linear2.appendView(preview, {flex: 1})
				linear.appendView(editorTab, {flex: '30px'})
				linear.appendView(linear2, {flex: 1})
				layout.appendAfterFileTree(linear, {flex: 1})

				// editor
				var editorView = new EditorView({
					el: editor._$dom,
					projectManager: options.projectManager
				})
			})

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