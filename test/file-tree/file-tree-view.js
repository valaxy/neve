define(function (require) {
	var temp = requireNode('temp')
	var fs = requireNode('fs')
	var FileTreeModel = require('src/file-tree/file-tree-model')
	var FileTreeView = require('src/file-tree/file-tree-view')

	module('FileTreeView')

	//test('init environment', function (assert) {
	//	var done = assert.async()
	//	var tree = new FileTreeModel
	//	assert.equal(tree.get('nodes').length, 0)
	//
	//	var rootdir = temp.mkdirSync('case') // temp file dir
	//	fs.writeFileSync(path.join(rootdir, '1.txt'), '1')
	//	fs.writeFileSync(path.join(rootdir, '2.md'), '2')
	//	fs.mkdirSync(path.join(rootdir, 'a'))
	//	fs.writeFileSync(path.join(rootdir, 'a', '3.md'), '3')
	//
	//	new FileTreeView({
	//		el: $('<div></div>'),
	//		model: tree,
	//		root: rootdir
	//	})
	//
	//	setTimeout(function () {
	//		assert.equal(tree.get('nodes').length, 4)
	//		done()
	//	}, 1000)
	//})

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
	//				assert.equal(tree.get('nodes').length, 1)
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
	//				assert.equal(tree.get('nodes').length, 2)
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