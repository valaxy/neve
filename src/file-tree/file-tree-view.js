define(function (require) {
	var path = requireNode('path')
	var watch = requireNode('../../node_modules/watch/main')
	var TreeNode = require('../tree/node-model')

	var FileTreeView = Backbone.View.extend({

		_jstree: null,              // jstree control handler
		_pathToModel: {},            // path -> node.cid
		_mapUiToModel: {},          // a tree node id hash map from ui to model
		_mapModelToUi: {},          // a tree node id hash map from model to ui
		_pathToUIId: {},

		events: {
			// when click file load the file content
			'click li': function () {

			}
		},

		_addFile: function (absolutePath, stat, updatefileSystem, updateModel, updateUI) {
			var curPath = path.relative(this._root, absolutePath)
			var dirPath = path.dirname(curPath)
			var curModel = new TreeNode({
				name: path.basename(curPath),
				path: curPath,
				isDir: stat.isDirectory()
			})
			var dirModel = this._pathToModel[dirPath]

			if (curPath == '') {
				this.model.add(curModel)
				var rootId = this._jstree.create_node(null, {
					name: absolutePath,
					type: 'directory'
				})
				this._pathToUIId['.'] = rootId
				this._pathToModel['.'] = curModel
			} else {
				var dirNodeId = this._pathToUIId[dirPath]
				this.model.add(curModel, dirModel)       // add model
				var nodeId = this._jstree.create_node(dirNodeId, {
					name: curModel.get('name'),
					type: curModel.get('isDir') ? 'directory' : 'file'
				})   // add ui
				this._pathToUIId[curPath] = nodeId
				this._pathToModel[curPath] = curModel
			}

		},

		initialize: function (options) {
			var me = this
			this._root = options.root


			// init UI
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


			// update when change
			watch.createMonitor(this._root, function (monitor) {
				monitor.on('created', function (file, stat) {
					me._addFile(file, stat, false, true, true)
				})
			})


			// iterate the file tree to add all the files and directories
			watch.watchTree(this._root, function (files, curr, prev) {
				if (typeof files == 'object' && curr == null && prev == null) {
					watch.unwatchTree(me._root)
					for (var key in files) {
						me._addFile(key, files[key], false, true, true)
					}
				}
			})
		}
	})


	if (typeof QUnit != 'undefined') {
		var fs = requireNode('fs')
		var path = requireNode('path')
		var temp = requireNode('../../node_modules/temp/lib/temp')
		var TreeModel = require('../tree/tree-model')

		QUnit.module('FileTreeView')

		QUnit.test('init environment', function (assert) {
			var done = assert.async()
			var tree = new TreeModel
			assert.equal(tree.get('nodes').length, 0)

			var dir = temp.mkdirSync('case')
			fs.writeFileSync(path.join(dir, '1.txt'), '1')
			fs.writeFileSync(path.join(dir, '2.txt'), '2')
			fs.mkdirSync(path.join(dir, 'a'))
			fs.writeFileSync(path.join(dir, 'a', '3.txt'), '3')

			new FileTreeView({
				el: $('<div></div>'),
				model: tree,
				root: dir
			})

			setTimeout(function () {
				assert.equal(tree.get('nodes').length, 5)
				done()
			}, 1000)
		})

		//QUnit.test('delta condition', function (assert) {
		//
		//})
	}

	return FileTreeView
})