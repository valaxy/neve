define(function (require, exports) {
	var CreateProjectDialogView = require('./view')
	var ProjectManager = require('../project-manager/project-manager')

	exports.init = function () {
		var dialog = new CreateProjectDialogView({
			el: $('.create-project-dialog'),
			projectManager: new ProjectManager
		})
		dialog.open()
	}
})