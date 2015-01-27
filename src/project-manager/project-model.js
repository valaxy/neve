define(function (require, exports) {
	var ProjectModel = Backbone.Model.extend({
		defaults: {
			name: '',    // unique identity of project
			location: '' // absolute path in local file system
		}
	})

	return ProjectModel
})