define(function (require, exports) {

	var windows = []

	/**
	 ** fn:
	 **     init: function
	 **     dispose: function
	 */
	exports.loadWindow = function (fn) {
		windows.push(fn)
	}

})