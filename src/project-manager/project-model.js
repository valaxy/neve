define(function (require) {
	require('backbone')
	var FileModel = require('../file-tree/file-model')
	var path = require('bower_components/path/path')
	var fs = requireNode('fs')

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
		}],


		// save the opened file
		saveOpen: function (content) {
			var absolutePath = path.join(this.get('location'), this.get('openFile').get('path'))
			fs.writeFile(absolutePath, content, function (err) {
				if (err) {
					alert(err)
				}
			})
		}
	})

	return ProjectModel
})