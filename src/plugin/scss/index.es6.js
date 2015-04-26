define(function (require, exports) {
	var fileWatcherLoader = require('../../file-watch-api/file-watcher-loader')

	exports.init = function () {
		fileWatcherLoader.load({
			name       : 'scss',
			description: 'compile .scss to .css',
			filter     : '*.scss',
			program    : 'scss',
			arguments  : [
				'--no-cache',
				'--update',
				'--sourcemap=none',
				'{{name}}:{{nameWithoutExtension}}.css'
			]
		})
	}
})