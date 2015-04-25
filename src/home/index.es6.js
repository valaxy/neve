define(function (require, exports) {
	//var nodegit = requireNode('nodegit')

	var g = require('./global')
	var layout = require('../window/layout')
	var ProjectManager = require('../project-manager/project-manager')
	var ProjectModel = require('../project-manager/project-model')
	var Loading = require('../loading/index')
	var fileWatcherLoader = require('../file-watch-api/file-watcher-loader')
	var stackAnalysis = require('stack-analysis')

	var pandocPlugin = require('../plugin/pandoc/index')
	var markdownPlugin = require('../plugin/markdown/index')

	var loader = require('../loader/index')
	var editor = require('../editor/index')

	require('css!./index')
	require('css!bower_components/normalize.css/normalize.css')


	exports.init = function () {
		var loading = new Loading
		var projectManager = g.projectManager = new ProjectManager

		$.when(
			loader.load('../status-bar/view').done(function (StatusBarView) {
				new StatusBarView
			}),
			loader.load('../top-nav/index').done(function (TopNavView) {
				new TopNavView({
					projectManager: projectManager
				})
			}),
			loader.load('../file-tree/file-tree-view', '../project-manager/file-tree-model').done(function (FileTreeView, FileTreeModel) {
				g.fileTree = (new FileTreeView({
					model: new FileTreeModel,
					projectManager: projectManager
				})).model
			})
		).done(function () {
				layout.init()
				loading.dispose()

				fileWatcherLoader.init({
					projectManager: projectManager
				})

				editor.init({
					projectManager: projectManager
				})

				//pandocPlugin.init({
				//	projectManager: projectManager
				//})

				markdownPlugin.init({
					projectManager: projectManager
				})

				projectManager.open(new ProjectModel({
					name: 'CF',
					location: 'd:/test'
				}))


				// for debug
				setTimeout(function () {
					// 打开文件
					var file = g.fileTree.getFileByPath('readme.md')
					g.fileTree.get('project').set('openFile', file)

					// 状态条弹出
					$('.status-bar::shadow .views').click()

					// 弹出rename框
					$($('.file-tree::shadow .jstree a')[1]).trigger('contextmenu')
					$('.file-tree::shadow .jstree-contextmenu li:last-child a').click()
				}, 500)

				//console.log(new Error().stack)
				//console.log(stackAnalysis())
			})
	}
})

