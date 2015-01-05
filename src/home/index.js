define(function (require, exports) {
	var path = requireNode('path')

	var boxLayout = require('../../bower_components/jquery-box-layout/src/box-layout')
	var process = require('../process/process')
	var TreeView = require('../file-tree/file-tree-view')
	var FileTreeModel = require('../file-tree/file-tree-model')
	var TopNavView = require('../top-nav/index')
	var g = require('./global')
	var editor = require('../editor/editor')


	exports.init = function () {

		var $dom = boxLayout.init({
			_schema: 'linear',
			isHor: false,
			boxes: [{
				_schema: 'box',
				size: 20,
				domSelector: '.top-nav'
			}, {
				_schema: 'linear',
				size: 'auto',
				isHor: true,
				boxes: [{
					_schema: 'box',
					size: 200,
					domSelector: '.tree'
				}, {
					_schema: 'box',
					size: 600,
					domSelector: '.editor'
				}, {
					_schema: 'box',
					size: 'auto',
					domSelector: '.preview'
				}]
			}]
		})
		$('.everything').append($dom)

		editor.init()

		// the file tree
		g.fileTree = (new TreeView({
			model: new FileTreeModel({
				root: 'd://neve/src/markdown-style'
			}),
			el: $('.tree')
		})).model

		process.init()

		new TopNavView
	}
})

