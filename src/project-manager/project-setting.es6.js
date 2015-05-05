define(function (require) {
	var Backbone = require('backbone')
	var fs = requireNode('fs')
	var path = requireNode('path')

	var SETTING_FILE_NAME = 'project.json'
	var ProjectSetting = Backbone.Model.extend({
		defaults: function () {
			return {
				opendFiles: [] // all the opened files in relative path
			}
		},

		save: function () {
			//var json = JSON.stringify(this.toJSON(), 2)
			//var settingFile = path.join(project.get('location'), project.CONFIG_DIR_NAME, SETTING_FILE_NAME)
			

		},

		read: function () {

		},

		initialize: function () {
			this.listenTo(this, 'change', () => {
				this.save()
			})
		}
	}, {
		create: function (project) {
			var settingFile = path.join(project.get('location'), project.CONFIG_DIR_NAME, SETTING_FILE_NAME)
			if (fs.existsSync(settingFile)) {
				var json = fs.readFileSync(settingFile)
				var obj = JSON.parse(json)
				return new ProjectSetting(obj)
			} else {
				return new ProjectSetting
			}
		}
	})

	return ProjectSetting
})