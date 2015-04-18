define(function (require, exports) {
	var markdown = require('bundle!marked')
	var loader = require('../../loader/index')
	var layout = require('../../window/layout')
	var editor = require('../../editor/index')
	var fileWatcherLoader = require('../../file-watch-api/file-watcher-loader')
	var html = require('html!./preview')


	exports.init = function (options) {
		this._projectManager = options.projectManager

		this._projectManager.on('open', function () {
			// show view
		})

		this._projectManager.on('close', function () {
			// hide view
		})


		// this.listenTo(this._projectManager, '', function(){
		// }, function() {
		//    return this._projectManager.active()
		// })

		var $preview = layout.load2(html, function () {
			// nothing
		})

		fileWatcherLoader.load({
			name: 'markdown',
			description: 'compile markdown to html',
			script: (input, callback) => {
				var $content = $preview.find('.content')
				var html = markdown(input)

				// recover the scroll postion
				var top = $content[0].scrollTop
				$content.html(html)
				$content[0].scrollTop = top
				callback()
			}
		})
	}


	exports.dispose = function () {

	}

})