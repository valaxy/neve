define(function (require, exports) {
	var markdown = require('bundle!marked')
	var loader = require('../../loader/index')
	var layout = require('../../window/layout')
	var editor = require('../../editor/index')
	var fileWatcherLoader = require('../../file-watch-api/file-watcher-loader')
	var html = require('html!./preview')
	var css = require('style!./preview')
	var dom = require('../../utility/dom')
	var log = require('../../log/log')()


	exports.init = function () {
		var $preview = layout.load2(html, {
			title  : 'Preview',
			dispose: function () {
				// nothing
			}
		})
		dom.appendStyle($preview[0], css)


		fileWatcherLoader.load({
			name       : 'markdown',
			description: 'compile markdown to html',
			filter     : 'xxxxxxxxxxxyyyy', // 暂时禁用它的功能调试用
			script     : (input, callback) => {
				var $content = $preview.find('.content')
				var html = markdown(input)

				// recover the scroll postion
				var top = $content[0].scrollTop
				$content.html(html)
				$content[0].scrollTop = top

				log.log('markdown render')
				callback()
			}
		})

		//log.log('markdown plugin has been loaded')
	}


	exports.dispose = function () {

	}

})