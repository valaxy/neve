define(function (require, exports) {


	exports.appendStyle = function (dom, styleContent) {
		var style = document.createElement('style')
		style.setAttribute('type', 'text/css')
		style.textContent = styleContent
		dom.appendChild(style)
	}


	exports.importStyle = function (dom, styleUrl) {
		var style = document.createElement('style')
		style.setAttribute('type', 'text/css')
		style.textContent = '@import "' + styleUrl + '";'
		dom.appendChild(style)
	}


	exports.orderInParent = function (dom) {
		var parent = dom.parentNode
		var element = parent.firstElementChild
		var index = 0
		while (true) {
			if (element == dom) {
				return index
			}
			index++
			element = element.nextElementSibling
		}
	}

})