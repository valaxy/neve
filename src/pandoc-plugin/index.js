define(function (require, exports) {
	var LinearLayout = require('bower_components/jquery-flex-layout/src/view/linear-layout')
	var SimpleView = require('bower_components/jquery-flex-layout/src/view/simple-view')
	var async = require('async')

	var loader = require('../loader/index')
	var layout = require('../home/layout')
	var Editor = require('../editor/editor')

	exports.init = function (options) {
		this._projectManager = options.projectManager

		this._projectManager.on('open', function () {
			async.parallel([
				function (done) {
					loader.load('text!../editor/index.html',
						'text!../preview/index.html',
						'text!../editor-tab/index.html').done(function (editor, preview, editorTab) {
							done(null, $(editor), $(preview), $(editorTab))
						})
				}
			], function (err, results) {
				if (!err) {
					var linear = new LinearLayout({direction: 'column'})
					var linear2 = new LinearLayout({direction: 'row'})
					var editor = new SimpleView({selector: results[0][0]})
					var preview = new SimpleView({selector: results[0][1]})
					var editorTab = new SimpleView({selector: results[0][2]})
					linear2.appendView(editor, {flex: 1})
					linear2.appendView(preview, {flex: 1})
					linear.appendView(editorTab, {flex: '30px'})
					linear.appendView(linear2, {flex: 1})
					layout.appendAfterFileTree(linear, {flex: 1})

					// editor
					new Editor({
						el: editor._$dom,
						projectManager: options.projectManager
					})
				} else {
					alert(err)
				}
			})
		})

		this._projectManager.close('close', function () {

		})
	}
})