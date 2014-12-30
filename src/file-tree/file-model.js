define(function () {
	var FileModel = Backbone.Model.extend({
		defaults: {
			name: '123',    // file name display in ui
			path: ''        // file relative path of root
		}
	})

	return FileModel
})