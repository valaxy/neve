define(function (require) {
	var fs = requireNode('fs')
	var path = requireNode('path')
	var watch = requireNode('watch')
	var watch2 = new (require('../file-system/watch'))

	var JstreeAdapter = require('./jstree/js-adapter')
	var FileModel = require('../project-manager/file-model')
	var g = require('../home/global')

	var fswrap = require('../file-system/fs-wrap')
	//var process = require('./process')
	var async = require('async')
	require('jstree')

	var loader = require('../loader/index')
	var html = require('text!./index.html')
	var css = require('style!./index')
	var dom = require('../utility/dom')


	/** Events:
	 **     - selectFile(file: FileModel)
	 **     - selectDirectory(dir: FileModel)
	 ** Options:
	 **     - filters: String */
	var FileTreeView = Backbone.View.extend({
		_pathToDomId: {},

		events: {
			openFile: function (event, file) {
				this._openFile(file, true, false)
			}
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
						me._fileTree.deleteFile(me._pathToDomId[fileModel.get('path')])
					}
					done()
				}
			], function (err) {
				if (err) {
					alert(err)
				}
			})

		},

		_createRoot: function () {
			var model = new FileModel({
				path: '.',  // current path
				isDir: true
			})

			this.model.addRoot(model)
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
				function (done) { // judge exist
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
				function (done) { // update fileSystem if needed
					if (updateFileSystem) {
						fswrap.create(fileAbsPath, isDirectory, me._asyncDone(done))
					} else {
						done()
					}
				},
				function (done) { // update model if needed
					if (updateModel) {
						var dirModel = me.model.getFileByPath(dirPath)
						me.model.add(curModel, dirModel) // no trigger anything
					} else {
						curModel = me.model.getFileByPath(curPath)
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
				this._fileTree.deleteFile(domId)
			}
			if (updateModel) {
				this.model.addRoot(null)
			}
		},

		_openFile: function (file, updateModel, updateDom) {
			if (updateModel) {
				this.model.get('project').set('openFile', file)
			}
			if (updateDom) {
				var domId = this._pathToDomId[file.get('path')]
				this._fileTree.selectFile(domId)
			}
		},


		_init: function () {
			var me = this
			var adapter = this._fileTree = new JstreeAdapter(this._$jstree)
			adapter.initContextMenu(function (file) {
				var model = file.data
				if (file.isDir) {
					return [{
						label: 'create directory',
						action: function () {
							var relPath = path.join(model.get('path'), 'new directory')
							me._addFile(relPath, true, true, true, true)
						}
					}, {
						label: 'create file',
						action: function () {
							var relPath = path.join(model.get('path'), 'new file.md')
							me._addFile(relPath, false, true, true, true)
						}
					}, {
						label: 'delete directory',
						action: function () {
							me._deleteFile(model, true, true, true, true)
						}
					}, {
						label: 'rename',
						action: function () {

						}
					}]
				} else { // file
					return [{
						label: 'delete file',
						action: function () {
							me._deleteFile(model, false, true, true, true)
						}
					}, {
						label: 'rename',
						action: function () {

						}
					}]
				}
			})
		},

		_initWatch: function () {
			var me = this

			// watch the file-tree
			async.series([
				(done)=> {
					watch2.walkAllFiles(me.model.get('root'), {
						filter: function (absolutePath, stat) {
							return !/\.git/.test(absolutePath)
								&& !/__pycache__/.test(absolutePath)
								&& !/\.idea/.test(absolutePath)
							//return stat.isDirectory() || /.*\.md/.test(absolutePath) // only add *.md
						}
					}, function (files) {
						me._createRoot(me.model.get('root'))
						var absolutePaths = Object.keys(files)
						for (var i = 1; i < absolutePaths.length; i++) {
							var absolutePath = absolutePaths[i]
							var relPath = path.relative(me.model.get('root'), absolutePath) // '' or 'a/1.txt'
							var stat = files[absolutePath]
							me._addFile(relPath, stat.isDirectory(), false, true, true)
						}
						done()
					})
				},
				(done)=> {
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
							var model = me.model.getFileByPath(relPath)
							me._deleteFile(model, stat.isDirectory(), false, true, true)
						})
					})
					// update when
					done()
				}
			], function () {

			})
		},

		_initModel: function () {
			this.listenTo(this.model, 'add:files', function (file) {
				var fileAbsPath = file.absolutePath(this.model.get('root'))
				if (file.get('path') == '.') {
					var curDomId = this._fileTree.addFile({
						label: this.model.get('root'),
						isDir: file.get('isDir'),
						data: file
					}, null)
					this._pathToDomId['.'] = curDomId
				} else {
					var dirDomId = this._pathToDomId[file.dirpath()]
					var curDomId = this._fileTree.addFile({
						label: file.name(),
						isDir: file.get('isDir'),
						data: file
					}, dirDomId)
					this._pathToDomId[file.get('path')] = curDomId
				}
			})


			this.listenTo(this.model, 'remove:files', function (file) {
				console.log(file)
			})
		},

		initialize: function (options) {
			var root = loader.loadDom('file-tree', html)
			this.setElement($(root).find('.file-tree'))
			dom.appendStyle(root, css)

			this._projectManager = options.projectManager
			this._$jstree = this.$('.jstree')
			this._init()

			this._projectManager.on('open', (project) => {
				this.model.set('root', project.get('location'))
				this.model.set('project', project)
				this._initModel()
				this._initWatch()
			})

			this._projectManager.on('close', () => {
				this.stopListening()
				watch.unwatchTree(this.model.get('root'))
				this._clearFile(true, true)
			})


		}
	})

	return FileTreeView
})