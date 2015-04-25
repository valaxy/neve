define(function (require, exports) {
	var LinearLayout = require('bower_components/jquery-flex-layout/src/view/linear-layout')
	var SimpleView = require('bower_components/jquery-flex-layout/src/view/simple-view')
	var loader = require('../loader/index')
	var html = require('html!./window-view')
	var mustache = require('mustache')
	var Window = require('./window')
	var WindowView = require('./window-view')

	var windows = []
	var welcome = new SimpleView({selector: $('<div><h1>Welcome</h1></div>')})

	exports.init = function () {
		var root = new LinearLayout({direction: 'column'})
		var topNav = new SimpleView({selector: '.top-nav'})
		var statusBar = new SimpleView({selector: '.status-bar'})
		var mainContent = new LinearLayout({direction: 'row'})

		root.appendView(topNav, {flex: '0 25px'})
		root.appendView(mainContent, {flex: '1', resizeableBefore: false})
		root.appendView(statusBar, {flex: '0 20px', resizeableBefore: false})

		mainContent.appendView(welcome, {flex: '1'})

		this._linearLayout = mainContent
		$('.everything').append(root.$dom())


		// add explorer
		this.load2($('.file-tree'), {
			position: 'left',
			flex: '0 300px',
			title: 'explorer'
		})
	}

	exports.appendAfterFileTree = function (view, config) {
		this._linearLayout.appendView(view, config)
	}

	exports.closeAfterFileTree = function () {
		this._linearLayout.removeViewAt(1)
	}


	/** domOrHTML:
	 ** options:
	 **     dispose: function
	 **     title: null or some no empty string
	 **     position: 'left' | 'right'(default) | 'bottom'
	 */
	exports.load2 = function (domOrHTML, {
		dispose = () => {
			// nothing
		},
		title = null,
		position = 'right',
		icon = '',
		flex = '1'}) {


		var $outerRoot
		var $wrap
		if (title) {
			$wrap = $(mustache.render(html, {
				title: title
			}))
			$outerRoot = $('<div>')
			$wrap.append($outerRoot)
		} else {
			$wrap = $outerRoot = $('<div>')
		}

		var $innerRoot = $(domOrHTML)
		var shadowRoot = $outerRoot[0].createShadowRoot()
		shadowRoot.appendChild($innerRoot[0])

		var view = new SimpleView({selector: $wrap})
		console.log(this._linearLayout.getViewAt(0))
		// load by judge
		if (this._linearLayout.getViewAt(0) == welcome) {
			welcome.replaceWith(view)
		} else {
			this._linearLayout.addViewAtEdge(view, position, {flex: flex})
		}


		var window = new Window({
			name: title,
			icon: icon
		})
		windows.push({
			model: window,
			view: view,
			dispose: dispose
		})

		new WindowView({
			model: window,
			el: $wrap
		})

		return $innerRoot
	}

	exports.getWindows = function () {
		return windows
	}

})