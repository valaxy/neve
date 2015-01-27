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

	test('canCreate()', function (assert) {
		assert.ok(manager.canCreate(project))

		fs.mkdirSync(project.get('location'))
		assert.ok(!manager.canCreate(project))
	})


	test('create()', function (assert) {
		manager.create(project)
		assert.ok(!manager.canCreate(project))
		assert.ok(fs.existsSync(path.join(project.get('location'), '.neve')))
	})


	test('open()', function (assert) {
		manager.create(project)
		manager.on('open', function (opend) {
			assert.equal(opend, project)
		})
		manager.open(project)
		assert.equal(manager.active(), project)
	})


	test('active()', function (assert) {
		assert.equal(manager.active(), null)
		manager.open(project)
		assert.equal(manager.active(), project)
	})

})