define(function (require) {
	var fs = requireNode('fs')
	var path = requireNode('path')
	var watch = requireNode('watch')
	var fswrap = require('../file-system/fs-wrap')
	var watch2 = new (require('../file-system/watch'))

	var JstreeAdapter = require('./jstree/js-adapter')
	var FileModel = require('../project-manager/file-model')
	var async = require('async')
	var renameDialog = require('./rename-dialog/index')
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
				this.model.get('project').set('openFile', file)
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

		_createRoot: function () {
			var model = new FileModel({
				path: '.',  // current path
				isDir: true
			})

			this.model.addRoot(model)
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
			var adapter = this._fileTree = new JstreeAdapter(this._$jstree)
			adapter.initContextMenu((file) => {
				var model = file.data
				if (file.isDir) {
					return [{
						label: 'create directory',
						action: () => {
							this.model.createFile(new FileModel({
								path: path.join(model.get('path'), 'new directory'),
								isDir: true
							}))
						}
					}, {
						label: 'create file',
						action: () => {
							this.model.createFile(new FileModel({
								path: path.join(model.get('path'), 'new file.md'),
								isDir: false
							}))
						}
					}, {
						label: 'delete directory',
						action: () => {
							this.model.deleteFile(model)
						}
					}, {
						label: 'rename',
						action: function () {
							renameDialog.init()
							renameDialog.show(model)
						}
					}]
				} else { // file
					return [{
						label: 'delete file',
						action: () => {
							this.model.deleteFile(model)
						}
					}, {
						label: 'rename',
						action: () => {
							var domId = this._pathToDomId[model.get('path')]
							this.listenTo(model, 'change:name', function (model, name) {
								this._fileTree.renameFile(domId, name)
							})
							renameDialog.show(model)
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
							var f = new FileModel({
								path: relPath,
								isDir: stat.isDirectory()
							})
							var dirModel = me.model.getFileByPath(f.get('dirpath'))
							me.model.add(f, dirModel)
						}
						done()
					})
				},
				(done)=> {
					// update when change
					watch.createMonitor(me.model.get('root'), function (monitor) {
						monitor.on('created', function (absolutePath, stat) {
							var relPath = path.relative(me.model.get('root'), absolutePath)
							me.model.createFile(new FileModel({
								path: relPath,
								isDir: stat.isDirectory()
							}))
						})
						monitor.on('changed', function (absolutePath) {
							// do some change thing
						})
						monitor.on('removed', function (absolutePath, stat) {
							var relPath = path.relative(me.model.get('root'), absolutePath)
							var deletedFile = me.model.getFileByPath(relPath)
							if (deletedFile) { // todo: 这个sb地方, 有时, 会执行两次
								me.model.deleteFile(deletedFile)
							}
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
					var dirDomId = this._pathToDomId[file.get('dirpath')]
					var curDomId = this._fileTree.addFile({
						label: file.get('name'),
						isDir: file.get('isDir'),
						data: file
					}, dirDomId)
					this._pathToDomId[file.get('path')] = curDomId
				}
			})


			this.listenTo(this.model, 'remove:files', function (file) {
				this._fileTree.deleteFile(this._pathToDomId[file.get('path')])
			})

			this.listenTo(this.model.get('project'), 'change:openFile', function (file) {
				console.log(11111111111111)
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