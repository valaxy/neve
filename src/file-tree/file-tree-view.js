define(function (require) {
	var fs = requireNode('fs')
	var path = requireNode('path')
	var watch = requireNode('../../node_modules/watch/main')

	var FileModel = require('./file-model')
	var g = require('../home/global')

	var FileTreeView = Backbone.View.extend({

		_jstree: null,              // jstree control handler
		_domIdToModel: {},          // a tree node id hash map from ui to model
		_pathToModel: {},           // path -> node.cid
		_pathToDomId: {},

		events: {
			// when click file load the file content
			'select_node.jstree': function (event, data) {
				if (data.node.type == 'file') {
					var domId = data.node.id
					var model = this._domIdToModel[domId]
					this._openFile(model, true, false)
				}
			}
		},

		_addFile: function (absolutePath, stat, updatefileSystem, updateModel, updateUI) {
			var curPath = path.relative(this._root, absolutePath) // '' or 'a/1.txt'
			var dirPath = path.dirname(curPath)                   // '.' or 'a'
			var curModel = new FileModel({
				name: path.basename(curPath),
				path: curPath,
				isDir: stat.isDirectory()
			})
			var dirModel = this._pathToModel[dirPath]

			if (curPath == '') {
				curPath = '.'
				if (updateUI) {
					var curUIId = this._jstree.create_node(null, {
						text: absolutePath,
						type: 'directory',
						state: {
							opened: true
						}
					})
				}
			} else {
				var dirUIId = this._pathToDomId[dirPath]
				if (updateUI) {
					var curUIId = this._jstree.create_node(dirUIId, {
						text: curModel.get('name'),
						type: curModel.get('isDir') ? 'directory' : 'file',
						state: {
							opened: true
						}
					})
				}
			}

			this._pathToDomId[curPath] = curUIId
			this._pathToModel[curPath] = curModel
			this._domIdToModel[curUIId] = curModel

			if (updateModel) {
				this.model.add(curModel, dirModel)
			}

		},

		_openFile: function (file, updateModel, updateUI) {
			if (updateModel) {
				this.model.set('openFile', file)
			}
			if (updateUI) {
				// none
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
						icon: 'fa fa-archive'
					}
				},
				contextmenu: {
					items: function (node) {
						if (node.type == 'directory') {
							return {
								//create: {
								//	label: '',
								//	action: function () {
								//		console.log(123)
								//	}
								//}
							}
						} else { // file

						}
					}
				},

				plugins: ['types', 'wholerow', 'contextmenu']
			})
			this._jstree = this.$el.jstree()


			async.series([
				function (callback) {
					// iterate the file tree to add all the files and directories
					watch.watchTree(me._root, {
						filter: function (absolutePath, stat) {
							return stat.isDirectory() || /.*\.md/.test(absolutePath) // only add *.md
						}
					}, function (files, curr, prev) {
						if (typeof files == 'object' && curr == null && prev == null) {
							for (var key in files) {
								me._addFile(key, files[key], false, true, true)
							}
							watch.unwatchTree(me._root)
							callback()
						}
					})
				},
				function (callback) {
					// update when change
					watch.createMonitor(me._root, function (monitor) {
						monitor.on('created', function (file, stat) {
							me._addFile(file, stat, false, true, true)
						})
						monitor.on('changed', function (file) {

						})
						monitor.on('removed', function (file, stat) {

						})
					})
					// update when
					callback()
				}
			], function () {
				if (g.test) {
					me._openFile(me._pathToModel['compete.md'], true, true)
				}
			})

			this.listenTo(this.model, 'change:openFile', function (fileTree, file) {
				var content = fs.readFileSync(path.join(me._root, file.get('path')), {
					encoding: 'utf-8'
				})
				g.editor.setValue(content)
			})

		}
	})


	if (typeof QUnit != 'undefined') {
		var temp = requireNode('../../node_modules/temp/lib/temp')
		var FileTreeModel = require('./file-tree-model')

		QUnit.module('FileTreeView')

		QUnit.test('init environment', function (assert) {
			var done = assert.async()
			var tree = new FileTreeModel
			assert.equal(tree.get('nodes').length, 0)

			var rootdir = temp.mkdirSync('case') // temp file dir
			fs.writeFileSync(path.join(rootdir, '1.txt'), '1')
			fs.writeFileSync(path.join(rootdir, '2.md'), '2')
			fs.mkdirSync(path.join(rootdir, 'a'))
			fs.writeFileSync(path.join(rootdir, 'a', '3.md'), '3')

			new FileTreeView({
				el: $('<div></div>'),
				model: tree,
				root: rootdir
			})

			setTimeout(function () {
				assert.equal(tree.get('nodes').length, 4)
				done()
			}, 1000)
		})

		QUnit.test('delta change about creating', function (assert) {
			var done = assert.async()
			var tree = new FileTreeModel
			var rootdir = temp.mkdirSync('case')
			new FileTreeView({
				el: $('<div></div>'),
				model: tree,
				root: rootdir
			})

			async.series([
				// init condition
				function (callback) {
					setTimeout(function () {
						assert.equal(tree.get('nodes').length, 1)
						callback()
					}, 500)
				},

				// create file
				function (callback) {
					setTimeout(function () {
						fs.writeFileSync(path.join(rootdir, '1'), '1')
						callback()
					}, 3000) // wait unitil view is finish
				},

				// test create condition
				function (callback) {
					setTimeout(function () {
						assert.equal(tree.get('nodes').length, 2)
						callback()
					}, 3000) // it's very slow
				}
			], function () {
				done()
			})
		})

		//QUnit.test('delta change about changing', function (assert) {
		//	var done = assert.async()
		//	var tree = new FileTreeModel
		//	var rootdir = temp.mkdirSync('case')
		//	new FileTreeView({
		//		el: $('<div></div>'),
		//		model: tree,
		//		root: rootdir
		//	})
		//
		//
		//	async.series([
		//		// init condition
		//		function (finish) {
		//
		//		},
		//
		//		function (finish) {
		//			setTimeout(function () {
		//
		//				finish()
		//			}, 3000)
		//		},
		//		function (finish) {
		//			setTimeout(function () {
		//				finish()
		//			}, 3000)
		//		}
		//	], function () {
		//		done()
		//	})
		//})
	}

	return FileTreeView
})