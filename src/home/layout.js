define(function (require, exports) {
	var treeLayout = require('bower_components/jquery-flex-layout/src/view/tree-layout')

	exports.init = function () {
		var $dom = treeLayout.init({
			_schema: 'linear',
			direction: 'column',
			views: [{
				_schema: 'view',
				flex: 1,
				selector: '.top-nav'
			}, {
				_schema: 'linear',
				direction: 'row',
				flex: 24,
				views: [{
					_schema: 'view',
					flex: 1,
					selector: '.explorer'
				}, {
					_schema: 'linear',
					flex: 4,
					direction: 'row',
					views: [{
						_schema: 'view',
						flex: 1,
						selector: '.editor'
					}, {
						_schema: 'view',
						flex: 1,
						selector: '.preview'
					}]
				}]
			}]
		})
		$('.everything').append($dom)
	}
})
