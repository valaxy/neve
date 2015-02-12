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
					loader.loadHTML('editor', 'index', function ($dom) {
						done(null, $dom)
					})
				},
				function (done) {
					loader.loadHTML('preview', 'index', function ($dom) {
						done(null, $dom)
					})
				}
			], function (err, results) {
				if (!err) {
					var linear = new LinearLayout({direction: 'row'})
					var editor = new SimpleView({selector: results[0]})
					var preview = new SimpleView({selector: results[1]})
					linear.appendView(editor, {flex: 1})
					linear.appendView(preview, {flex: 1})
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