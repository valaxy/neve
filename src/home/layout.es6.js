define(function (require, exports) {
	var treeLayout = require('bower_components/jquery-flex-layout/src/view/tree-layout')
	var LinearLayout = require('bower_components/jquery-flex-layout/src/view/linear-layout')
	var SimpleView = require('bower_components/jquery-flex-layout/src/view/simple-view')
	var loader = require('../loader/index')

	exports.init = function () {
		var l1 = new LinearLayout({direction: 'column'})
		var mainContent = new LinearLayout({direction: 'row'})
		var topNav = new SimpleView({selector: '.top-nav'})
		var statusBar = new SimpleView({selector: '.status-bar'})
		var explorer = new SimpleView({selector: '.file-tree'})
		var emptyWorkplace = new SimpleView({selector: $('<div></div>')})
		l1.appendView(topNav, {flex: '0 25px'})
		l1.appendView(mainContent, {flex: '1'})
		l1.appendView(statusBar, {flex: '0 20px'})
		var $dom = l1._$dom

		mainContent.appendView(explorer, {flex: '0 200px'})
		//mainContent.appendView(emptyWorkplace, {flex: '1'})

		this._linearLayout = mainContent

		$('.everything').append($dom)
	}

	exports.appendAfterFileTree = function (view, config) {
		this._linearLayout.appendView(view, config)
	}

	exports.closeAfterFileTree = function () {
		this._linearLayout.removeViewAt(1)
	}

	/** @deprecated */
	exports.load = function (name, domOrHTML) {
		var $realRoot = $('<div>').addClass(name)
		var shadowRoot = $realRoot[0].createShadowRoot()
		shadowRoot.appendChild($(domOrHTML)[0])

		var view = new SimpleView({
			selector: $realRoot
		})
		this._linearLayout.addViewAtEdge(view, 'right', {
			flex: '1'
		})
	}


	/** domOrHTML:
	 ** dispose:
	 */
	exports.load2 = function (domOrHTML, dispose) {
		var $outerRoot = $('<div>')
		var $innerRoot = $(domOrHTML)
		var shadowRoot = $outerRoot[0].createShadowRoot()
		shadowRoot.appendChild($innerRoot[0])

		var view = new SimpleView({
			selector: $outerRoot
		})
		this._linearLayout.addViewAtEdge(view, 'right', {
			flex: '1'
		})

		return $innerRoot
	}
})


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