define(function (require, exports) {
	var childProcess = requireNode('child_process')
	var fs = requireNode('fs')
	var path = requireNode('path')

	var Timer = require('../../bower_components/timer/src/timer')
	var TreeView = require('../file-tree/tree-view')
	var TreeModel = require('../tree/tree-model')

	exports.init = function () {
		//var Model = require('../treeui/tree-model')

		//require('../process/process')
		var fs = requireNode('fs')


		var INPUT_FILE = 'f://test/test.md'
		var OUTPUT_FILE = 'f://test/test.html'


		var editor = ace.edit($('.editor')[0])
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

					childProcess.exec('pandoc -f markdown -t html ' + INPUT_FILE, function (error, stdout, stderr) {
						$('.preview').html(stdout)
						me.next()
					})
				})
			}
		})

		timer.start()


		//watch.createMonitor('f://test', function (monitor) {
		//	monitor.on('created', function (file, stat) {
		//		console.log(file, stat)
		//	})
		//})


		// the file tree
		var treeModel = new TreeModel
		new TreeView({
			model: treeModel,
			el: $('.tree')
		})

	}
})