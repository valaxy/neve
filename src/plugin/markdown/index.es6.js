define(function (require, exports) {
	var LinearLayout = require('bower_components/jquery-flex-layout/src/view/linear-layout')
	var SimpleView = require('bower_components/jquery-flex-layout/src/view/simple-view')
	var async = require('async')
	var markdown = require('bundle!marked')

	var loader = require('../../loader/index')
	var layout = require('../../home/layout')
	var Editor = require('../../editor/editor')
	var fileWatcherLoader = require('../../loader/file-watcher-loader')

	exports.init = function (options) {
		this._projectManager = options.projectManager

		this._projectManager.on('open', function () {
			loader.load('html!../editor/index',
				'html!../preview/index',
				'html!../editor-tab/index').done(function (editor, preview, editorTab) {
					var linear = new LinearLayout({direction: 'column'})
					var linear2 = new LinearLayout({direction: 'row'})
					var editor = new SimpleView({selector: $(editor)})
					var preview = new SimpleView({selector: $(preview)})
					var editorTab = new SimpleView({selector: $(editorTab)})
					linear2.appendView(editor, {flex: 1})
					linear2.appendView(preview, {flex: 1})
					linear.appendView(editorTab, {flex: '30px'})
					linear.appendView(linear2, {flex: 1})
					layout.appendAfterFileTree(linear, {flex: 1})

					// editor
					var editorView = new Editor({
						el: editor._$dom,
						projectManager: options.projectManager
					})
				})
		})

		this._projectManager.on('close', function () {

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