define(function (require, exports) {
	var $ = require('jquery')

	var shadowRoots = {}

	exports.loadHTML = function (html) {
		return $(html).appendTo($('.everything'))
	}


	exports.loadDom = function (name, html) {
		var $dom = $('<div>').addClass(name)
		var root = shadowRoots[name] = $dom[0].createShadowRoot()
		root.appendChild($(html)[0])
		$('.everything').append($dom)
		return $dom
	}

	exports.loadStyle = function (name, styleContent) {
		var root = shadowRoots[name]
		var style = document.createElement('style')
		style.setAttribute('type', 'text/css')
		style.textContent = styleContent
		root.appendChild(style)
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