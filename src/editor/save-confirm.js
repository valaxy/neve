define(function (require, exports) {
	var global = require('../home/global')
	var autoSave = require('./auto-save')
	var ExitConfirm = require('bower_components/exit-confirm/exit-confirm')

	exports.init = function () {
		var editor = global.editor
		var fileTree = global.fileTree
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

		//// confirm when change file
		//fileTree.on('change:openFile', function () {
		//	alert()
		//})
	}
})