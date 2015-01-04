define(function (require) {
	var NodeModel = require('../tree/node-model')

	var FileModel = NodeModel.extend({
		defaults: function () {
			return {
				name: '',
				path: '',
				isDir: true,
				isOpen: false
			}
		}
	})

	return FileModel
})