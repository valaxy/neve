define(function (require) {
	var FileModel = require('./file-model')
	var utility = require('../utility/utility')
	var path = require('path')
	var fswrap = require('../file-system/fs-wrap')
	var Backbone = require('backbone')
	var propagation = require('backbone-event-propagation')
	require('backbone-relational')


	/** Events:
	 **     addFile
	 **     modifyFile
	 **     deleteFile
	 */
	var FileTreeModel = propagation.mixin(Backbone.RelationalModel.extend({
		defaults: function () {
			return {
				project: null,
				root   : '' // absolute path of file system
			}
		},

		relations: [{
			/** The root directory */
			key            : 'rootDir',
			type           : Backbone.HasOne,
			relatedModel   : FileModel,
			reverseRelation: {
				type: Backbone.HasOne
			}
		}, {
			/** All the files that in this tree */
			key            : 'files',
			type           : Backbone.HasMany,
			relatedModel   : FileModel,
			reverseRelation: {
				key: 'tree'
			}
		}],


		propagation: {
			name   : 'file-tree',
			targets: []
		},


		initialize: function () {
			this._pathToModel = {} // path -> model

			this.listenTo(this, 'add:files', function (file) {
				this.trigger('addFile', file)
			})
		},

		/** Return a file the match the relative path */
		getFileByPath: function (path) {
			return this._pathToModel[path]
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

		add2: function (a) {

		},

		exist: function (file) {
			return !!this._pathToModel[file.get('path')]
		},


		//-----------------------------------------------------------
		// File System Depend
		//-----------------------------------------------------------

		/** Rename file or directory
		 **/
		rename: function (file, newName, callback) {
			fswrap.rename(file.absolutePath(this.get('root')), newName, function (err) {
				if (err) {
					callback(err)
					return
				}
				file.set('name', newName)
				callback()
			})
		},


		/** Create file or directory
		 */
		createFile: function (file) {
			var fileAbsPath = file.absolutePath(this.get('root'))
			fswrap.create(fileAbsPath, file.get('isDir'), (err, stat) => {
				if (err) {
					alert(err)
				}
				file.set('modifiedTime', stat.mtime)
				var dirModel = this.getFileByPath(file.get('dirpath'))
				this.add(file, dirModel) // no trigger anything
			})
		},

		deleteFile: function (file) {
			if (this.exist(file)) {
				var absolutePath = path.join(this.get('root'), file.get('path'))
				fswrap.delete(absolutePath, file.get('isDir'), ()=> {
					this.remove(file)
				})
				return true
			} else {
				return false
			}
		},

		/** Remove the subtree whose root is node, return the node */
		remove: function (file) {
			file.cut()
			this._cut(file)
			return file
		},


		_add: function (file) {
			if (file.get('path') in this._pathToModel) {
				console.log('file that has path of "' + file.get('path') + '" exist')
				return file.cid
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
	}))

	return FileTreeModel
})

