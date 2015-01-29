define(function () {
	var ProjectModel = Backbone.Model.extend({
		defaults: {
			name: '',       // unique identity of project
			location: ''    // absolute path of local file system
		}
	})

	return ProjectModel
})