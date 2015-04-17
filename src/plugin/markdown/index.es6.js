define(function (require, exports) {
	var markdown = require('bundle!marked')
	var loader = require('../../loader/index')
	var layout = require('../../home/layout')
	var fileWatcherLoader = require('../../loader/file-watcher-loader')
	var html = require('html!./preview')


	exports.init = function (options) {
		this._projectManager = options.projectManager

		this._projectManager.on('open', function () {
			// show view
		})

		this._projectManager.on('close', function () {
			// hide view
		})

		var $preview = layout.load2(html, function () {
			// nothing
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