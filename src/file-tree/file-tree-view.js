define(function (require) {
	var fs = requireNode('fs')
	var path = requireNode('path')
	var watch = requireNode('../../node_modules/watch/main')

	var FileModel = require('./file-model')
	var g = require('../home/global')
	var contextmenu = require('./jstree/contextmenu')
	var fswrap = require('../file-system/fs-wrap')

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

		_createRoot: function () {
			var model = new FileModel({
				path: '.',  // current path
				isDir: true
			})

			var domId = this._jstree.create_node(null, {
				text: this.model.get('root'),
				type: 'directory',
				state: {
					opened: true
				}
			})

			this._pathToDomId['.'] = domId
			this._pathToModel['.'] = model
			this._domIdToModel[domId] = model
		},

		_asyncDone: function (done) {
			return function (err) {
				if (err) {
					done(err)
				} else {
					done()
				}
			}
		},

		_deleteFile: function (fileModel, isDirectory, updateFileSystem, updateModel, updateDom) {
			var absolutePath = path.join(this.model.get('root'), fileModel.get('path'))
			var me = this
			async.series([
				function (done) {
					if (updateFileSystem) {
						fswrap.delete(absolutePath, isDirectory, me._asyncDone(done))
					} else {
						done()
					}
				},

				function (done) {
					me.model.remove(fileModel)
					done()
				},

				function (done) {
					if (updateDom) {
						me._jstree.delete_node(me._pathToDomId[fileModel.get('path')])
					}
					done()
				}
			], function (err) {
				if (err) {
					alert(err)
				}
			})

		},

		_addFile: function (curPath, isDirectory, updateFileSystem, updateModel, updateDom) {
			var me = this
			var dirPath = path.dirname(curPath)                   // '.' or 'a'

			async.series([
				// judge exist
				function (done) {
					if (updateFileSystem) {
						var fileAbsPath = path.join(me.model.get('root'), curPath)
						fs.exists(fileAbsPath, function (exists) {
							if (exists) {
								done('file or directory is exist')
							} else {
								done()
							}
						})
					} else {
						done()
					}
				},

				// update fileSystem if needed
				function (done) {
					var fileAbsPath = path.join(me.model.get('root'), curPath)
					if (updateFileSystem) {
						fswrap.create(fileAbsPath, isDirectory, me._asyncDone(done))
					} else {
						done()
					}
				},
				// update model/dom if needed
				function (done) {
					if (updateModel) {
						var dirModel = me._pathToModel[dirPath]
						var curModel = new FileModel({
							path: curPath,
							isDir: isDirectory
						})

						me.model.add(curModel, dirModel) // no trigger anything
					} else {

					}

					if (updateDom) {
						var dirDomId = me._pathToDomId[dirPath]
						var curDomId = me._jstree.create_node(dirDomId, {
							text: path.basename(curPath),
							type: curModel.get('isDir') ? 'directory' : 'file',
							state: {
								opened: true
							}
						})
					}

					me._pathToDomId[curPath] = curDomId
					me._pathToModel[curPath] = curModel
					me._domIdToModel[curDomId] = curModel
					done()
				}
			], function (err) {
				if (err) {
					alert(err)
				}
			})
		},

		_openFile: function (file, updateModel, updateUI) {
			if (updateModel) {
				this.model.set('openFile', file)
			}
			if (updateUI) {
				// none
			}
		},

		initialize: function () {
			var me = this

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
				contextmenu: contextmenu(this),
				plugins: ['types', 'wholerow', 'contextmenu']
			})
			this._jstree = this.$el.jstree()

			// watch the file-tree
			async.series([
				function (callback) {
					// iterate the file tree to add all the files and directories
					watch.watchTree(me.model.get('root'), {
						//filter: function (absolutePath, stat) {
						//	return stat.isDirectory() || /.*\.md/.test(absolutePath) // only add *.md
						//}
					}, function (files, curr, prev) {
						if (typeof files == 'object' && curr == null && prev == null) {
							me._createRoot(me.model.get('root'))
							var absolutePaths = Object.keys(files)
							for (var i = 1; i < absolutePaths.length; i++) {
								var absolutePath = absolutePaths[i]
								var relPath = path.relative(me.model.get('root'), absolutePath) // '' or 'a/1.txt'
								var stat = files[absolutePath]
								me._addFile(relPath, stat.isDirectory(), false, true, true)
							}
							watch.unwatchTree(me.model.get('root'))
							callback()
						}
					})
				},
				function (callback) {
					// update when change
					watch.createMonitor(me.model.get('root'), function (monitor) {
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
					me._openFile(me._pathToModel['sample.md'], true, true)
				}
			})

			this.listenTo(this.model, 'change:openFile', function (fileTree, file) {
				var content = fs.readFileSync(path.join(me.model.get('root'), file.get('path')), {
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