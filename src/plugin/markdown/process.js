define(function (require, exports) {
	var editorWatch = require('../../editor/editor-watch')
	var markdown = require('bundle!marked')

	exports.init = function () {
		editorWatch.on('update', function (done, text) {
			var $preview = $('.preview .content')
			var html = markdown(text)

			// recover the scroll postion
			var top = $preview[0].scrollTop
			$preview.html(html)
			$preview[0].scrollTop = top
		})

		editorWatch.start()
	}

	exports.immediate = function () {
		editorWatch.immediate()
	}

})
