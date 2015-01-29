define(function (require) {
	var path = require('bower_components/path/path')

	/** File or Directory */
	var FileModel = Backbone.RelationalModel.extend({
		defaults: function () {
			return {
				path: '',        // relative path of root
				isDir: true,    // if it is a directory
				isOpen: false   // if it is opend by editor, multiply files can be opend at same time, imply or exply
			}
		},

		relations: [{
			/** Children */
			key: 'children',
			//relatedModel: FileModel, ref itself
			type: Backbone.HasMany,
			reverseRelation: {
				key: 'parent'
			}
		}],


		/** Get name of file or directory. */
		name: function () {
			return path.basename(this.get('path'))
		},


		/** Get the base directory path of file or directory.
		 ** If it's root dir, return '.' */
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


		/** Get absolute path of file or directory
		 ** @params root path, optional */
		absolutePath: function (root) {
			root = root ? root : this.get('tree').get('root')
			return path.join(root, this.get('path'))
		},


		/** Check if it is a leaf */
		isLeaf: function () {
			return this.get('children').length == 0
		},


		/** Add child and return this */
		addFile: function (child /* ... */) {
			for (var i in arguments) {
				var child = arguments[i]
				this.get('children').add(child)
			}
			return this
		},

		/** Remove the subtree whose root is this, return this */
		cut: function () {
			if (this.get('parent')) {
				return this.get('parent').get('children').remove(this)
			} else {
				return this
			}
		}
	})

	return FileModel
})