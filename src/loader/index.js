define(function (require, exports) {
	var $ = require('jquery')


	exports.loadHTML = function (html) {
		return $(html).appendTo($('.everything'))
	}


	exports.load = function (/* moduleNames */) {
		var moduleNames = Array.prototype.slice.call(arguments)
		var dfd = $.Deferred()
		require(moduleNames, function () {
			dfd.resolve.apply(dfd, arguments)
		})
		return dfd.promise()
	}

})