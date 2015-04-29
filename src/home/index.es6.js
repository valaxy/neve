define(function (require, exports) {
	//var nodegit = requireNode('nodegit')

	var layout = require('../window/layout')
	var ProjectManager = require('../project-manager/project-manager')
	var ProjectModel = require('../project-manager/project-model')
	var Loading = require('../loading/index')
	var fileWatcherLoader = require('../file-watch-api/file-watcher-loader')
	var stackAnalysis = require('stack-analysis')
	var log = require('../log/log')

	var pandocPlugin = require('../plugin/pandoc/index')
	var markdownPlugin = require('../plugin/markdown/index')
	var scssPlugin = require('../plugin/scss/index')
	var jadePlugin = require('../plugin/jade/index')

	var loader = require('../loader/index')
	var editor = require('../editor/index')

	require('css!./index')
	require('css!bower_components/normalize.css/normalize.css')


	var loading = new Loading
	var projectManager = new ProjectManager

	$.when(
		loader.load('../status-bar/view').done(function (StatusBarView) {
			new StatusBarView
		}),
		loader.load('../top-nav/index').done(function (TopNavView) {
			new TopNavView({
				projectManager: projectManager
			})
		}),
		loader.load('../file-tree/file-tree-view').done(function (FileTreeView) {
			new FileTreeView({
				//model         : new FileTreeModel,
				projectManager: projectManager
			})
		})
	).done(function () {
			layout.init()
			loading.dispose()


			editor.init({
				projectManager: projectManager
			})

			fileWatcherLoader.init({
				projectManager: projectManager,
				editor        : editor
			})


			//----------------------------------------------------------------
			// load all plugins
			//----------------------------------------------------------------
			markdownPlugin.init({
				projectManager: projectManager
			})
			scssPlugin.init()
			jadePlugin.init()


			projectManager.open(new ProjectModel({
				name    : 'CF',
				location: 'd:/test'
			}))

			log.init()


			// for debug
			setTimeout(function () {
				// 打开文件
				var file = projectManager.active().getFileByPath('readme.md')
				projectManager.active().changeOpenFile(file)

				// 状态条弹出
				//$('.status-bar::shadow .views').click()

				// 弹出rename框
				//$($('.file-tree::shadow .jstree a')[1]).trigger('contextmenu')
				//$('.file-tree::shadow .jstree-contextmenu li:last-child a').click()
			}, 500)
		})
})


//pandocPlugin.init({
//	projectManager: projectManager
//})