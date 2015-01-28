define(function (require) {
	var TreeModel = require('bower_components/backbone-tree-model/src/tree-model')
	var FileModel = require('./file-model')
	var utility = require('../utility/utility')
	var path = requireNode('path')
	var fs = requireNode('fs')

	var FileTreeModel = TreeModel.extend({
		defaults: function () {
			return {
				project: null,
				root: '' // absolute path of file system
			}
		},

		relations: utility.extendArray([], TreeModel.prototype.relations, [{
			type: Backbone.HasOne,
			key: 'openFile',
			relatedModel: FileModel,
			reverseRelation: {
				type: Backbone.HasOne
			}
		}]),

		// save the opened file
		saveOpen: function (content) {
			var absolutePath = path.join(this.get('root'), this.get('openFile').get('path'))
			fs.writeFile(absolutePath, content, function (err) {
				if (err) {
					alert(err)
				}
			})
		}
	})

	return FileTreeModel
})

