define(function (require) {
	require('backbone')
	var FileModel = require('../file-tree/file-model')

	var ProjectModel = Backbone.RelationalModel.extend({
		defaults: {
			name: '',             // unique identity of project
			location: '',         // absolute path of local file system
			lastOpenedDate: null // opened time
		},

		relations: [{
			/** Opened File */
			type: Backbone.HasOne,
			key: 'openFile',
			relatedModel: FileModel,
			reverseRelation: {
				type: Backbone.HasOne
			}
		}]
	})

	return ProjectModel
})