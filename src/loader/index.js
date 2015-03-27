define(function (require, exports) {
	var $ = require('jquery')

	exports.loadHTML = function (html) {
		return $(html).appendTo($('.everything'))
	}

})