define(function (require, exports) {
	var CreateProjectDialogView = require('src/create-project-dialog/view')
	var ProjectManager = require('src/project-manager/project-manager')

	exports.init = function () {
		var dialog = new CreateProjectDialogView({
			el: $('.create-project-dialog'),
			projectManager: new ProjectManager
		})
		dialog.open()
	}
})