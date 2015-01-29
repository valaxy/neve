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
			this.get('files').add(child)
			if (parent) {
				parent.addFile(child)
			}
			return child.cid
		},

		/** Remove the subtree whose root is node, return the node */
		remove: function (node) {
			this.get('files').remove(node)
			node.cut()
			var me = this
			node.get('children').forEach(function (child) {
				me._cut(child)
			})
			return node
		},

		_cut: function (node) {
			this.get('files').remove(node)
			var me = this
			node.get('children').forEach(function (child) {
				me._cut(child)
			})
		}
	})

	return FileTreeModel
})

