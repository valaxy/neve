define(function (require) {
	var $ = require('jquery')
	require('magnific-popup')
	var path = require('bower_components/path/path')
	var Project = require('../project-manager/project-model')
	var fileDialog = require('bower_components/nw-file-dialog/index')

	/** Events: close */
	var CreateProjectDialog = Backbone.View.extend({
		events: {
			'input .name': function () {
				if (this._hasName) {
					var dirname = path.dirname(this._$location.val())
				} else {
					var dirname = this._$location.val()
				}

				var location = path.join(dirname, this._$name.val())
				this._$location.val(location)
				this._hasName = this._$name.val() ? true : false
				this._$errMsg.hide()
			},
			'click .ok': function () {
				var me = this
				var project = new Project({
					name: this._$name.val(),
					location: this._$location.val()
				})
				this._projectManager.create(project, function (err) {
					if (err) {
						me._$errMsg.html('create project fail')
						me._$errMsg.show()
					} else {
						me._$errMsg.hide()
						me.close()
						me._projectManager.open(project)
					}
				})
			},
			'click .cancel': function () {
				this.close()
			},
			'click .location-select': function () {
				var me = this
				fileDialog.openDir({}, function (dir) {
					var name = me._$name.val()
					var location = path.join(dir, name)
					me._$location.val(location)
				})
			}
		},

		open: function () {
			$.magnificPopup.open({
				items: {
					src: this.$el,
					type: 'inline'
				},
				modal: true
			})
		},

		close: function () {
			$.magnificPopup.close()
			this.trigger('close')
		},

		initialize: function (options) {
			this._projectManager = options.projectManager

			this._$name = this.$('.name')
			this._$location = this.$('.location')
			this._$ok = this.$('.ok')
			this._$cancel = this.$('.cancel')
			this._$errMsg = this.$('.error-msg')
			this._hasName = false // if user input a name
		}
	})

	return CreateProjectDialog
})