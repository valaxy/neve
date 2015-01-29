define(function (require) {
	var temp = requireNode('temp')
	var fs = requireNode('fs')

	var FileTreeModel = require('src/file-tree/file-tree-model')
	var FileTreeView = require('src/file-tree/file-tree-view')
	var ProjectManager = require('src/project-manager/project-manager')
	var utility = require('../utility')
	var domHtml = require('text!src/file-tree/index.html')
	var Project = require('src/project-manager/project-model')

	module('FileTreeView')


	test('open a project', function (assert) {
		var done = assert.async()

		// init environment
		var root = utility.createProjectFiles()
		var tree = new FileTreeModel({
			root: root
		})
		var projectManager = new ProjectManager
		assert.equal(tree.get('files').length, 0)


		// init view
		new FileTreeView({
			el: $(domHtml),
			model: tree,
			projectManager: projectManager
		})

		projectManager.open(new Project({
			name: 'test-project',
			location: root
		}))

		// give them 1s to process
		setTimeout(function () {
			assert.equal(tree.get('files').length, 4)
			done()
		}, 1000)
	})

	//test('delta change about creating', function (assert) {
	//	var done = assert.async()
	//	var tree = new FileTreeModel
	//	var rootdir = temp.mkdirSync('case')
	//	new FileTreeView({
	//		el: $('<div></div>'),
	//		model: tree,
	//		root: rootdir
	//	})
	//
	//	async.series([
	//		// init condition
	//		function (callback) {
	//			setTimeout(function () {
	//				assert.equal(tree.get('files').length, 1)
	//				callback()
	//			}, 500)
	//		},
	//
	//		// create file
	//		function (callback) {
	//			setTimeout(function () {
	//				fs.writeFileSync(path.join(rootdir, '1'), '1')
	//				callback()
	//			}, 3000) // wait unitil view is finish
	//		},
	//
	//		// test create condition
	//		function (callback) {
	//			setTimeout(function () {
	//				assert.equal(tree.get('files').length, 2)
	//				callback()
	//			}, 3000) // it's very slow
	//		}
	//	], function () {
	//		done()
	//	})
	//})
	//
	//test('delta change about changing', function (assert) {
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
})