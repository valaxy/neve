define(function (require, exports) {
	var $ = require('jquery')

	exports.loadHTML = function (mod, name, callback) {
		$.get('../' + mod + '/' + name + '.html', function (html) {
			callback($(html))
		})
	}

})