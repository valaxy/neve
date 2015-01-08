define(function (require, exports) {

	var boxLayout = require('bower_components/jquery-box-layout/src/box-layout')

	exports.init = function () {
		var $dom = boxLayout.init({
			_schema: 'linear',
			isHor: false,
			size: 'auto',
			isPer: false,
			boxes: [{
				_schema: 'box',
				size: 20,
				domSelector: '.top-nav'
			}, {
				_schema: 'linear',
				size: 'auto',
				isHor: true,
				isPer: false,
				boxes: [{
					_schema: 'box',
					size: 200,
					domSelector: '.explorer'
				}, {
					_schema: 'linear',
					size: 'auto',
					isHor: true,
					isPer: true,
					boxes: [{
						_schema: 'box',
						size: 50,
						domSelector: '.editor'
					}, {
						_schema: 'box',
						size: 'auto',
						domSelector: '.preview'
					}]
				}]
			}]
		})
		$('.everything').append($dom)
	}
})
