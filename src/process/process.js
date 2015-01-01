define(function (require, exports) {
	var fs = requireNode('fs')
	var childProcess = requireNode('child_process')
	var Timer = require('../../bower_components/timer/src/timer')
	var g = require('../home/global')


	var INPUT_FILE = 'f://test/test.md'

	exports.init = function () {
		var timer = new Timer({
			interval: 1000 * 5,
			immediate: true,
			task: function () {
				var me = this
				fs.writeFile(INPUT_FILE, g.editor.getValue(), function (err) {
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
	}
})