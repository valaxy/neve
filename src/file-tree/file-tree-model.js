define(function (require) {
	var TreeModel = require('../tree/tree-model')
	var FileModel = require('./file-model')
	var utility = require('../utility/utility')

	var FileTreeModel = TreeModel.extend({
		defaults: {
			nothing: ''
		},

		relations: utility.extendArray([], TreeModel.prototype.relations, [{
			type: Backbone.HasOne,
			key: 'openFile',
			relatedModel: FileModel,
			reverseRelation: {
				type: Backbone.HasOne
			}
		}])
	})

	return FileTreeModel
})