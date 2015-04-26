define(function (require, exports) {
	var fileWatcherLoader = require('../../file-watch-api/file-watcher-loader')

	exports.init = function () {
		fileWatcherLoader.load({
			filter: '*.scss',
			program: 'scss --no-cache --update --sourcemap=none {{$name}}:{{$nameWithoutExtension$}}.css'
		})
	}
})