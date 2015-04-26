define(function (require, exports) {
	var fileWatcherLoader = require('../../file-watch-api/file-watcher-loader')

	exports.init = function () {
		fileWatcherLoader.load({
			name       : 'jade',
			description: 'compile .jade to .html',
			filter     : '*.jade',
			program    : 'jade',
			arguments  : [
				'{{name}}'
			]
		})
	}
})