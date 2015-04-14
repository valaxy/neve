define(function (require, exports) {
	var autoSave = require('./auto-save')
	var ExitConfirm = require('bower_components/exit-confirm/exit-confirm')

	exports.init = function (options) {
		var editor = options.editorView
		var projectManager = options.projectManager

		var isSave = true

		// change save flag to no-save
		editor.on('change', function () {
			isSave = false
		})

		// change save flag to has-save
		autoSave.on('save', function () {
			isSave = true
		})

		// confirm when exit page
		var exitConfirm = new ExitConfirm('文档还未保存，确定退出吗？', function () {
			return isSave
		})
		exitConfirm.on()

		// confirm when change file
		projectManager.on('openFile', function () {
			alert()
		})
	}
})