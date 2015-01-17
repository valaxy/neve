define(function (require) {
	var path = require('bower_components/path/path')
	var NodeModel = require('bower_components/backbone-tree-model/src/node-model')

	/** File or Directory */
	var FileModel = NodeModel.extend({
		defaults: function () {
			return {
				path: '',        // relative path of tree.get('root')
				isDir: true,    // if it is a directory
				isOpen: false   // if it is opend by editor, multiply files can be opend at same time, imply or exply
			}
		},

		/** Get name of file or directory. */
		name: function () {
			return path.basename(this.get('path'))
		},

		/**
		 * Get the base directory path of file or directory.
		 * If it's root dir, return '.'
		 */
		dirpath: function () {
			return path.dirname(this.get('path'))
		},

		/** Rename file or directory */
		rename: function (newName) {
			if (!newName) {
				return false
			}

			var newPath = path.join(this.dirpath(), newName)
			this.set('path', newPath)
			return true
		},

		/**
		 * Get absolute path of file or directory
		 * @params root optional
		 */
		absolutePath: function (root) {
			root = root ? root : this.get('tree').get('root')
			return path.join(root, this.get('path'))
		}
	})

	return FileModel
})