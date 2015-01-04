define(function (require) {
	var NodeModel = require('../tree/node-model')

	var FileModel = NodeModel.extend({
		defaults: function () {
			return {
				path: '',        // relative path of tree.get('root')
				isDir: true,    // if it is a directory
				isOpen: false   // if it is opend by editor, multiply files can be opend at same time, imply or exply
			}
		}
	})

	return FileModel
})