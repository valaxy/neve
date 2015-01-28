define(function (require) {
	var temp = requireNode('temp')
	var path = requireNode('path')
	var fs = requireNode('fs')
	var ProjectManager = require('src/project-manager/project-manager')
	var ProjectModel = require('src/project-manager/project-model')


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

	test('open()', function (assert) {
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


	test('active()', function (assert) {
		assert.equal(manager.active(), null)
		manager.open(project)
		assert.equal(manager.active(), project)
	})

})