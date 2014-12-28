define(function (require, exports) {
	var childProcess = requireNode('child_process')
	var fs = requireNode('fs')

	var Timer = require('../../bower_components/timer/src/timer')

	exports.init = function () {
		//var Model = require('../treeui/tree-model')

		//require('../process/process')
		var fs = requireNode('fs')


		var INPUT_FILE = 'f://test/test.md'
		var OUTPUT_FILE = 'f://test/test.html'


		var editor = ace.edit($('.editor')[0])
		editor.setTheme("ace/theme/monokai");
		editor.getSession().setMode("ace/mode/javascript");

		//var timer = new Timer({
		//	interval: 1000 * 5,
		//	immediate: true,
		//	task: function () {
		//		fs.writeFile(INPUT_FILE, editor.getValue(), function (err) {
		//			if (err) {
		//				$('.preview').html(err)
		//			}
		//
		//			childProcess.exec('pandoc -f markdown -t html ' + INPUT_FILE, function (error, stdout, stderr) {
		//				$('.preview').html(stdout)
		//				console.log(timer)
		//				timer.next()
		//			})
		//		})
		//	}
		//})
		//
		//timer.start()

		var watch = requireNode('../../node_modules/watch/main')
		watch.watchTree('f://test', function (f, curr, prev) {
			console.log(f, curr, prev)
		})





	}
})