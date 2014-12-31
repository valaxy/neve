define(function (require) {
	var path = requireNode('path')
	var watch = requireNode('../../node_modules/watch/main')
	var TreeNode = require('../tree/node-model')

	var DIR = 'f://test'

	var TreeView = Backbone.View.extend({

		_jstree: null,              // jstree control handler
		_pathToModel: {},            // path -> node.cid
		_mapUiToModel: {},          // a tree node id hash map from ui to model
		_mapModelToUi: {},          // a tree node id hash map from model to ui
		_pathToUiId: {},

		events: {
			// when click file load the file content
			'click li': function () {

			}
		},

		// not include root dir
		_addFile: function (absolutePath, stat) {
			var curPath = path.relative(DIR, absolutePath)
			var dirPath = path.dirname(curPath)
			var curNode = new TreeNode({
				name: path.basename(curPath),
				path: curPath,
				isDir: stat.isDirectory()
			})
			var dirNode = this._pathToModel[dirPath]

			if (curPath == '') {
				this.model.add(curNode)
				var rootId = this._jstree.create_node(null, {
					name: absolutePath,
					type: 'directory',
					expand: true
				})
				this._pathToUiId['.'] = rootId
				this._pathToModel['.'] = curNode
			} else {
				var dirNodeId = this._pathToUiId[dirPath]
				this.model.add(curNode, dirNode)       // add model
				var nodeId = this._jstree.create_node(dirNodeId, {
					name: curNode.get('name'),
					type: curNode.get('isDir') ? 'directory' : 'file',
					expand: true
				})   // add ui
				this._pathToUiId[curPath] = nodeId
				this._pathToModel[curPath] = curNode
			}
		},

		initialize: function () {
			var me = this


			// init jstree
			this.$el.jstree({
				core: {
					check_callback: true
				},
				types: {
					file: {
						icon: 'fa fa-file-o'
					},
					directory: {
						icon: 'fa fa-at'
					}
				},

				plugins: ['types', 'wholerow', 'contextmenu']
			})
			this._jstree = this.$el.jstree()


			// iterate the file tree to add all the files and directories
			watch.watchTree(DIR, function (files, curr, prev) {
				if (typeof files == 'object' && curr == null && prev == null) {
					watch.unwatchTree(DIR)

					// add other files
					for (var key in files) {
						me._addFile(key, files[key])
					}
				}
			})
		}
	})


	return TreeView
})