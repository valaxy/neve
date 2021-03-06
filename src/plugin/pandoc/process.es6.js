define(function (require, exports) {
	var fs = requireNode('fs')
	var childProcess = requireNode('child_process')
	var editorWatch = require('../../editor/editor-watch')
	var INPUT_FILE = 'f://test/test.md'


	exports.init = function () {
		editorWatch.on('update', function (done, text) {
			fs.writeFile(INPUT_FILE, text, function (err) {
				var $preview = $('.preview .content')

				if (err) {
					$preview.html(err)
				}

				// -s: standalone
				var url = 'http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML'
				var cmd = 'pandoc --mathjax=' + url + ' -f markdown -t html ' + INPUT_FILE
				childProcess.exec(cmd, function (error, stdout, stderr) {
					console.log(stdout)

					// recover the scroll postion
					var top = $preview[0].scrollTop
					$preview.html(stdout)
					$preview[0].scrollTop = top

					MathJax.Hub.Queue(['Typeset', MathJax.Hub, $preview[0]])
					done()
				})
			})
		})

		editorWatch.start()
	}

	exports.immediate = function () {
		editorWatch.immediate()
	}

})
