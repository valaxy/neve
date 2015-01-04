define(function (require) {
	var TreeModel = require('../tree/tree-model')
	var utility = require('../utility/utility')

	var FileTreeModel = TreeModel.extend({
		defaults: {
			nothing: ''
		},

		relations: utility.extendArray([], TreeModel.prototype.relations)
	})

	return FileTreeModel
})