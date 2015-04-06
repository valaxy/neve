define(function (require, exports) {
	var treeLayout = require('bower_components/jquery-flex-layout/src/view/tree-layout')
	var LinearLayout = require('bower_components/jquery-flex-layout/src/view/linear-layout')
	var SimpleView = require('bower_components/jquery-flex-layout/src/view/simple-view')

	exports.init = function () {
		var l1 = new LinearLayout({direction: 'column'})
		var l2 = new LinearLayout({direction: 'row'})
		var topNav = new SimpleView({selector: '.top-nav'})
		var statusBar = new SimpleView({selector: '.status-bar'})
		var explorer = new SimpleView({selector: '.file-tree'})
		l1.appendView(topNav, {flex: '25px'})
		l1.appendView(l2, {flex: 1})
		l1.appendView(statusBar, {flex: '20px'})
		var $dom = l1._$dom
		l2.appendView(explorer, {flex: '200px'})
		this._linearLayout = l2

		//var $dom = treeLayout.init({
		//	_schema: 'linear',
		//	direction: 'column',
		//	views: [{
		//		_schema: 'view',
		//		flex: '25px',
		//		selector: '.top-nav'
		//	}, {
		//		_schema: 'linear',
		//		direction: 'row',
		//		flex: 1,
		//		views: [{
		//			_schema: 'view',
		//			flex: '200px',
		//			selector: '.explorer'
		//		}, {
		//			_schema: 'linear',
		//			flex: 1,
		//			direction: 'row',
		//			views: [{
		//				_schema: 'view',
		//				flex: 1,
		//				selector: '.editor'
		//			}, {
		//				_schema: 'view',
		//				flex: 1,
		//				selector: '.preview'
		//			}]
		//		}]
		//	}, {
		//		_schema: 'view',
		//		flex: '20px',
		//		selector: '.status-bar'
		//	}]
		//})

		$('.everything').append($dom)
	}

	exports.appendAfterFileTree = function (view, config) {
		this._linearLayout.appendView(view, config)
	}

	exports.closeAfterFileTree = function () {
		this._linearLayout.removeViewAt(1)
	}
})
