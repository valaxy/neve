define(function (require) {
	var FileModel = require('./file-model')
	var utility = require('../utility/utility')
	var path = requireNode('path')
	var fs = requireNode('fs')

	var FileTreeModel = Backbone.RelationalModel.extend({
		defaults: function () {
			return {
				project: null,
				root: '' // absolute path of file system
			}
		},

		relations: [{
			/** The root directory */
			key: 'rootDir',
			type: Backbone.HasOne,
			relatedModel: FileModel,
			reverseRelation: {
				type: Backbone.HasOne
			}
		}, {
			/** All the file */
			key: 'files',
			type: Backbone.HasMany,
			relatedModel: FileModel,
			reverseRelation: {
				key: 'tree'
			}
		}, {
			/** Opened File */
			type: Backbone.HasOne,
			key: 'openFile',
			relatedModel: FileModel,
			reverseRelation: {
				type: Backbone.HasOne
			}
		}],


		initialize: function () {
			this._pathToModel = {} // path -> model
		},

		/** Return a file the match the relative path */
		getFileByPath: function (path) {
			return this._pathToModel[path]
		},


		// save the opened file
		saveOpen: function (content) {
			var absolutePath = path.join(this.get('root'), this.get('openFile').get('path'))
			fs.writeFile(absolutePath, content, function (err) {
				if (err) {
					alert(err)
				}
			})
		},

		/** Add root or add a child of parent, return the cid of child */
		add: function (child, parent) {
			parent.addFile(child)
			return this._add(child)
		},

		/** Set the root dir */
		addRoot: function (dir) {
			this.set('rootDir', dir)
			this.get('files').reset()
			this._pathToModel = {}
			return this._add(dir)
		},

		/** Remove the subtree whose root is node, return the node */
		remove: function (file) {
			file.cut()
			this._cut(file)
			return file
		},


		_add: function (file) {
			if (file.get('path') in this._pathToModel) {
				throw 'file that has path of "' + file.get('path') + '" exist'
			}
			this._pathToModel[file.get('path')] = file
			this.get('files').add(file)
			return file.cid
		},

		_cut: function (file) {
			this.get('files').remove(file)
			delete this._pathToModel[file.get('path')]
			var me = this
			file.get('children').forEach(function (child) {
				me._cut(child)
			})
		}
	})

	return FileTreeModel
})

