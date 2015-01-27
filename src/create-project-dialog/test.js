define(function (require, exports) {
	var CreateProjectDialogView = require('./view')

	exports.init = function () {
		var dialog = new CreateProjectDialogView({
			el: $('.create-project-dialog')
		})
		dialog.open()
	}
})