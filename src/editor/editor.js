define(function (require, exports) {
	var g = require('../home/global')

	exports.init = function () {
		var editor = g.editor = ace.edit($('.editor .ace')[0])
		editor.setTheme("ace/theme/github")
		editor.getSession().setMode("ace/mode/markdown")
		editor.renderer.setShowGutter(false)
	}
})