define(function (require, exports) {
	var path = requireNode('path')

	var g = require('./global')
	var boxLayout = require('../../bower_components/jquery-box-layout/src/box-layout')
	var process = require('../process/process')
	var TreeView = require('../file-tree/file-tree-view')
	var TreeModel = require('../tree/tree-model')
	var TopNavView = require('../top-nav/index')


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


		var editor = g.editor = ace.edit($('.editor .ace')[0])
		editor.setTheme("ace/theme/monokai");
		editor.getSession().setMode("ace/mode/markdown");


		// the file tree
		var treeModel = new TreeModel
		new TreeView({
			model: treeModel,
			el: $('.tree'),
			root: 'f://test'
		})

		process.init()

		new TopNavView
	}
})