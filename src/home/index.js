define(function (require, exports) {
	var childProcess = requireNode('child_process')
	var fs = requireNode('fs')
	var path = requireNode('path')

	var g = require('./global')
	var boxLayout = require('../../bower_components/jquery-box-layout/src/box-layout')
	var Timer = require('../../bower_components/timer/src/timer')
	var TreeView = require('../file-tree/file-tree-view')
	var TreeModel = require('../tree/tree-model')


	exports.init = function () {
		var INPUT_FILE = 'f://test/test.md'
		var OUTPUT_FILE = 'f://test/test.html'


		var $dom = boxLayout.init({
			_schema: 'linear',
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
		})
		$('.everything').append($dom)


		var editor = g.editor = ace.edit($('.editor .ace')[0])
		editor.setTheme("ace/theme/monokai");
		editor.getSession().setMode("ace/mode/markdown");


		var timer = new Timer({
			interval: 1000 * 5,
			immediate: true,
			task: function () {
				var me = this
				fs.writeFile(INPUT_FILE, editor.getValue(), function (err) {
					if (err) {
						$('.preview').html(err)
					}

					// -s: standalone
					var url = 'http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML'
					var cmd = 'pandoc --mathjax=' + url + ' -f markdown -t html ' + INPUT_FILE
					childProcess.exec(cmd, function (error, stdout, stderr) {
						console.log(stdout)
						$('.preview').html(stdout)
						MathJax.Hub.Queue(['Typeset', MathJax.Hub, $('.preview')[0]])
						me.next()
					})
				})
			}
		})

		timer.start()


		// the file tree
		var treeModel = new TreeModel
		new TreeView({
			model: treeModel,
			el: $('.tree'),
			root: 'f://test'
		})


	}
})