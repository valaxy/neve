define(function (require) {
	var Project = require('src/project-manager/project-model')
	var ProjectManager = require('src/project-manager/project-manager')
	var CreateProjectDialogView = require('src/create-project-dialog/view')
	var domHtml = require('src/create-project-dialog/index.html')
	var path = require('bower_components/path/path')
	var temp = requireNode('temp')


	var view, project, dir, projectManager
	module('CreateProjectDialogView', {
		beforeEach: function () {
			projectManager = new ProjectManager
			view = new CreateProjectDialogView({
				el: $(domHtml),
				projectManager: projectManager
			})
			dir = temp.mkdirSync('temp')
			project = new Project({
				name: 'test',
				location: path.join(dir, 'test')
			})
		}
	})


	test('create a project', function (assert) {
		var done = assert.async()

		// input something
		view._$location.val(dir)
		view._$name.val(project.get('name'))
		view._$name.trigger('input')
		assert.equal(view._$location.val(), project.get('location'))
		assert.ok(!projectManager.isExist(project))

		// click ok
		view._$ok.click()

		// give it 100ms to create the project
		setTimeout(function () {
			assert.ok(projectManager.isExist(project))
			assert.equal(view._$errMsg.css('display'), 'none')

			// click ok again but exist
			view._$ok.click()

			// another 100ms
			setTimeout(function () {
				assert.equal(view._$errMsg.css('display'), 'block')
				done()
			}, 100)
		}, 100)
	})


})

