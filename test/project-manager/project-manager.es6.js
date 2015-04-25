define(function (require) {
	var temp = requireNode('temp')
	var path = requireNode('path')
	var fs = requireNode('fs')
	var ProjectManager = require('src/project-manager/project-manager')
	var ProjectModel = require('src/project-manager/project-model')
	var async = require('async')

	var root, manager, project

	module('ProjectManager', {
		beforeEach: function () {
			root = temp.mkdirSync('temp')
			manager = new ProjectManager
			project = new ProjectModel({
				name: 'test',
				location: path.join(root, 'test-project')
			})
		}
	})

	test('isExist()', function (assert) {
		// not exist
		assert.ok(!manager.isExist(project))

		// exist after create
		fs.mkdirSync(project.get('location'))
		assert.ok(manager.isExist(project))
	})


	test('openedHistory()', function (assert) {
		var done = assert.async()
		assert.deepEqual(manager.openedHistory(), [])
		var p1 = new ProjectModel
		manager.open(p1)
		assert.deepEqual(manager.openedHistory(), [p1])

		// make sure two projects are not created at the same time
		setTimeout(function () {
			var p2 = new ProjectModel
			manager.open(p2)
			assert.deepEqual(manager.openedHistory(), [p1, p2])
			done()
		}, 50)
	})


	test('create(): create a new project', function (assert) {
		var done = assert.async()
		assert.ok(!manager.isExist(project))
		manager.create(project, function (err) {
			assert.equal(err, null)
			assert.ok(fs.existsSync(path.join(project.get('location'), '.neve')))
			assert.ok(manager.isExist(project))
			done()
		})
	})

	test('create(): create a new but exist', function (assert) {
		var done = assert.async()
		manager.create(project, function () {
			manager.create(project, function (err) {
				assert.notEqual(err, null)
				done()
			})
		})
	})

	test('open(): event', function (assert) {
		var done = assert.async()
		manager.create(project, function () {
			manager.on('open', function (opend) {
				assert.equal(opend, project)
			})
			manager.open(project)
			assert.equal(manager.active(), project)
			done()
		})
	})


	test('open(): open a project in history', function (assert) {
		var done = assert.async()
		var p1 = new ProjectModel
		var p2 = new ProjectModel
		manager.open(p1)

		async.series([
			function (done) {
				setTimeout(function () {
					manager.open(p2)
					assert.deepEqual(manager.openedHistory(), [p1, p2])
					done()
				}, 50)
			},
			function (done) {
				setTimeout(function () {
					manager.open(p1)
					assert.deepEqual(manager.openedHistory(), [p2, p1])
					done()
				}, 50)
			}
		], function () {
			done()
		})
	})


	test('open(): open full project', function (assert) {
		var done = assert.async()
		var ps = []
		var i = 0
		async.whilst(
			function () {
				return i < ProjectManager.HistoryMaxCount
			},
			function (callback) {
				setTimeout(function () {
					var p = new ProjectModel
					ps.push(p)
					manager.open(p)
					i++
					callback()
				}, 20)
			},
			function () {
				assert.deepEqual(manager.openedHistory(), ps)

				setTimeout(function () {
					// open again
					var p = ps[0]
					manager.open(p)
					ps.splice(0, 1)
					ps.push(p)
					assert.deepEqual(manager.openedHistory().length, ProjectManager.HistoryMaxCount)
					assert.deepEqual(manager.openedHistory(), ps)
					done()
				}, 20)
			}
		)
	})

	test('active()', function (assert) {
		assert.equal(manager.active(), null)
		manager.open(project)
		assert.equal(manager.active(), project)
	})


})