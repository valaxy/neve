define(function (require) {
	var FileTreeModel = require('src/project-manager/file-tree-model')
	var FileModel = require('src/project-manager/file-model')

	QUnit.module('FileModel')


	//QUnit.test('rename()', function (assert) {
	//	var file = new FileModel({
	//		path: 'a/b/c.md'
	//	})
	//	assert.equal(file.rename('xxx'), true)
	//	assert.equal(file.get('path'), 'a/b/xxx')
	//
	//	assert.equal(file.rename(''), false)
	//})
	//
	QUnit.test('absolutePath()', function (assert) {
		var file = new FileModel({path: 'a/b'})
		var ftree = new FileTreeModel({
			root: 'd:/'
		})
		ftree.addRoot(file)
		assert.equal(file.absolutePath(), 'd:/a/b')
	})


	QUnit.test('addFile()/cut()/parent/children', function (assert) {
		var root = new FileModel
		assert.equal(root.get('children').length, 0)

		var n1 = new FileModel
		var n2 = new FileModel
		var n3 = new FileModel
		root.addFile(n1, n2)
		assert.equal(n2.addFile(n3), n2)

		assert.equal(root.get('parent'), null)
		assert.equal(n1.get('parent'), root)
		assert.equal(n2.get('parent'), root)
		assert.equal(n3.get('parent'), n2)
		assert.equal(root.get('children').length, 2)
		assert.equal(root.get('children').at(0), n1)
		assert.equal(root.get('children').at(1), n2)

		assert.equal(n2.cut(), n2)
		assert.equal(root.get('children').length, 1)
		assert.equal(n2.get('parent'), null)
	})


	QUnit.test('isLeaf()', function (assert) {
		var root = new FileModel
		assert.ok(root.isLeaf())

		var n1 = new FileModel
		root.addFile(n1)
		assert.ok(!root.isLeaf())
		assert.ok(n1.isLeaf())
	})

	QUnit.test('name', function (assert) {
		assert.equal(new FileModel({path: '.'}).get('name'), '.')
		assert.equal(new FileModel({path: 'a'}).get('name'), 'a')
		assert.equal(new FileModel({path: 'a/b'}).get('name'), 'b')
		assert.equal(new FileModel({path: 'a/b/c.md'}).get('name'), 'c.md')
		assert.equal(new FileModel({path: 'a/b.html.md'}).get('name'), 'b.html.md')

		// set
		assert.equal(new FileModel({path: 'a/b/c.md'}).set('name', 'ddd').get('name'), 'ddd')
	})


	QUnit.test('extension', function (assert) {
		assert.equal(new FileModel({path: 'index.html'}).get('extension'), 'html')
		assert.equal(new FileModel({path: 'index.html.md'}).get('extension'), 'md')
		assert.equal(new FileModel({path: 'index.'}).get('extension'), '')
		assert.equal(new FileModel({path: '.'}).get('extension'), '')
	})

	QUnit.test('allExtensions', function (assert) {
		assert.equal(new FileModel({path: 'index.html'}).get('allExtensions'), 'html')
		assert.equal(new FileModel({path: 'index.html.md'}).get('allExtensions'), 'html.md')
		assert.equal(new FileModel({path: 'index.'}).get('allExtensions'), '')
		assert.equal(new FileModel({path: '.'}).get('allExtensions'), '')
	})


	QUnit.test('nameWithoutExtension', function (assert) {
		assert.equal(new FileModel({path: 'index.html'}).get('nameWithoutExtension'), 'index')
		assert.equal(new FileModel({path: 'index.html.md'}).get('nameWithoutExtension'), 'index.html')
		assert.equal(new FileModel({path: 'index.'}).get('nameWithoutExtension'), 'index')
		assert.equal(new FileModel({path: 'index'}).get('nameWithoutExtension'), 'index')
		//assert.equal(new FileModel({path: '.'}).get('nameWithoutExtension'), '')
	})

	QUnit.test('nameWithoutAllExtension', function (assert) {
		assert.equal(new FileModel({path: 'index.html'}).get('nameWithoutAllExtension'), 'index')
		assert.equal(new FileModel({path: 'index.html.md'}).get('nameWithoutAllExtension'), 'index')
		assert.equal(new FileModel({path: 'index.'}).get('nameWithoutAllExtension'), 'index')
		assert.equal(new FileModel({path: 'index'}).get('nameWithoutAllExtension'), 'index')
	})


	QUnit.test('dirpath', function (assert) {
		//assert.equal(new FileModel({path: '/'}).dirpath(), '.')     // absolute path, can not be abs path
		assert.equal(new FileModel({path: '.'}).get('dirpath'), '.')      // relative path, 'dot'
		assert.equal(new FileModel({path: 'aa'}).get('dirpath'), '.')     // relative path
		assert.equal(new FileModel({path: 'aa/bb'}).get('dirpath'), 'aa') // relative path
		assert.equal(new FileModel({path: 'aa/bb/cc'}).get('dirpath'), 'aa/bb')
		assert.equal(new FileModel({path: 'aa/bb/../cc'}, {parse: true}).get('dirpath'), 'aa')
		assert.equal(new FileModel({path: './aa/bb'}, {parse: true}).get('dirpath'), 'aa')
		assert.equal(new FileModel({path: 'aa/bb.md'}).get('dirpath'), 'aa')
	})
	//
	//QUnit.test('dirname()', function (assert) {
	//	assert.equal(new FileModel({path: '.'}).dirname(), '.')
	//	assert.equal(new FileModel({path: 'aa'}).dirname(), '.')
	//	assert.equal(new FileModel({path: 'aa/bb'}).dirname(), 'aa')
	//	assert.equal(new FileModel({path: 'aa/bb/cc'}).dirname(), 'bb')
	//})
})