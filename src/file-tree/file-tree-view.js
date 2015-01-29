define(function (require) {
	var fs = requireNode('fs')
	var path = requireNode('path')
	var watch = requireNode('watch')

	var FileModel = require('./file-model')
	var g = require('../home/global')
	var contextmenu = require('./jstree/contextmenu')
	var fswrap = require('../file-system/fs-wrap')
	var process = require('../process/process')
	var async = require('async')
	require('jstree')


	var FileTreeView = Backbone.View.extend({

		_jstree: null,              // jstree control handler
		_domIdToModel: {},          // a tree node id hash map from ui to model
		_pathToModel: {},           // path -> node.cid
		_pathToDomId: {},

		events: {
			'dblclick.jstree': function (event) {
				var domId = $(event.target).parent()[0].id
				var node = this._jstree.get_node(domId)
				if (node.type == 'file') {
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

			this.model.addRoot(model)
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

		// delete file and sync state between fs/model/dom
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
					if (updateModel) {
						me.model.remove(fileModel)
					}
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

		// add a empty file and sync state between fs/model/dom
		_addFile: function (curPath, isDirectory, updateFileSystem, updateModel, updateDom) {
			var me = this
			var dirPath = path.dirname(curPath) // '.' or 'a'
			var curModel = new FileModel({
				path: curPath,
				isDir: isDirectory
			})
			var fileAbsPath = curModel.absolutePath(me.model.get('root'))

			async.series([
				// judge exist
				function (done) {
					if (updateFileSystem) {
						fs.exists(fileAbsPath, function (exists) {
							if (exists) {
								done((isDirectory ? 'directory' : 'file') + ' is exist')
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
					if (updateFileSystem) {
						fswrap.create(fileAbsPath, isDirectory, me._asyncDone(done))
					} else {
						done()
					}
				},

				// update model if needed
				function (done) {
					if (updateModel) {
						var dirModel = me._pathToModel[dirPath]
						me.model.add(curModel, dirModel) // no trigger anything
						me._pathToModel[curPath] = curModel
					} else {
						curModel = me._pathToModel[curPath]
					}
					done()
				},

				// update dom if needed
				function (done) {
					if (updateDom) {
						var dirDomId = me._pathToDomId[dirPath]
						var curDomId = me._jstree.create_node(dirDomId, {
							text: path.basename(curPath),
							type: curModel.get('isDir') ? 'directory' : 'file',
							state: {
								opened: true
							}
						})
						me._pathToDomId[curPath] = curDomId
						me._domIdToModel[curDomId] = curModel
					}

					done()
				}
			], function (err) {
				if (err) {
					alert(err)
				}
			})
		},

		_renameFile: function (file, newName, updateFileSystem, updateModel, updateDom) {
			// 有点麻烦, 暂时不实现
		},

		_clearFile: function (updateModel, updateDom) {
			if (updateDom) {
				var domId = this._pathToDomId['.']
				this._jstree.delete_node(domId)
			}
			if (updateModel) {
				this.model.addRoot(null)
			}
		},

		_openFile: function (file, updateModel, updateDom) {
			if (updateModel) {
				this.model.set('openFile', file)
			}
			if (updateDom) {
				var domId = this._pathToDomId[file.get('path')]
				this._jstree.select_node(domId)
			}
		},


		_initForDom: function () {
			this.$el.jstree({
				core: {
					check_callback: true
				},
				types: {
					file: {
						icon: 'fa fa-file-o'
					},
					directory: {
						icon: 'fa fa-folder'
					}
				},
				contextmenu: contextmenu(this),
				plugins: ['types', 'wholerow', 'contextmenu']
			})
			this._jstree = this.$el.jstree()
		},

		_initForWatch: function () {
			var me = this

			// watch the file-tree
			async.series([
				function (done) {
					// iterate the file tree to add all the files and directories
					watch.watchTree(me.model.get('root'), {
						filter: function (absolutePath, stat) {
							return !/\.git/.test(absolutePath)
								&& !/__pycache__/.test(absolutePath)
								&& !/\.idea/.test(absolutePath)
							//return stat.isDirectory() || /.*\.md/.test(absolutePath) // only add *.md
						}
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
							done()
						}
					})
				},
				function (done) {
					// update when change
					watch.createMonitor(me.model.get('root'), function (monitor) {
						monitor.on('created', function (absolutePath, stat) {
							var relPath = path.relative(me.model.get('root'), absolutePath)
							me._addFile(relPath, stat.isDirectory(), false, true, true)
						})
						monitor.on('changed', function (absolutePath) {
							// do some change thing
						})
						monitor.on('removed', function (absolutePath, stat) {
							var relPath = path.relative(me.model.get('root'), absolutePath)
							var model = me._pathToModel[relPath]
							me._deleteFile(model, stat.isDirectory(), false, true, true)
						})
					})
					// update when
					done()
				}
			], function () {
				if (g.test) {
					me._openFile(me._pathToModel['readme.md'], true, false)
				}
			})
		},


		initialize: function (options) {
			this._projectManager = options.projectManager
			this._initForDom()


			var me = this
			this.listenTo(this.model, 'change:openFile', function (fileTree, file) {
				var content = fs.readFileSync(file.absolutePath(fileTree.get('root')), {
					encoding: 'utf-8'
				})
				g.editor.setValue(content)
				process.immediate()
			})


			this._projectManager.on('open', function (project) {
				me.model.set('root', project.get('location'))
				me._initForWatch()
			})

			this._projectManager.on('close', function () {
				me.stopListening()
				watch.unwatchTree(me.model.get('root'))
				me._clearFile(true, true)
			})
		}
	})

	return FileTreeView
})