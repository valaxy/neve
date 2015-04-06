define(function (require, exports) {


	exports.appendStyle = function (dom, styleContent) {
		var style = document.createElement('style')
		style.setAttribute('type', 'text/css')
		style.textContent = styleContent
		dom.appendChild(style)
	}

})