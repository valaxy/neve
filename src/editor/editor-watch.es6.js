define(function (require, exports) {
	var Timer = require('bower_components/timer/src/timer')
	var _ = require('underscore')
	var Backbone = require('backbone')
	var propagation = require('backbone-event-propagation')

	_.extend(exports, Backbone.Events, propagation.mixin())

	var timer

	// control the watch frequency
	// when code update trigger a 'update' event
	exports.start = function (options) {
		var projectManager = options.projectManager
		var editor = options.editor

		function done() {
			timer.next()
		}

		var me = this
		var lastValue = undefined
		timer = new Timer({
			interval : 1000,
			immediate: true,
			task     : function () {
				var value = editor.getEditor().getValue()
				if (lastValue === undefined) { // no open file
					this.next()
					return
				}
				if (lastValue === null) { // open file but nothing
					lastValue = value
					this.next()
					return
				}
				if (value == lastValue) {
					this.next()
					return
				}
				lastValue = value
				me.trigger('update', done, value)
			}
		})

		this.listenToPro(projectManager, 'project', 'change:openFile', function () {
			lastValue = null
		})

		timer.start()
	}

	exports.immediate = function () {
		timer.immediate()
	}
})