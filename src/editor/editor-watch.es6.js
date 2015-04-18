define(function (require, exports) {
	var global = require('../home/global')
	var Timer = require('bower_components/timer/src/timer')
	var _ = require('underscore')

	_.extend(exports, Backbone.Events)

	var timer

	// control the watch frequency
	// when code update trigger a 'update' event
	exports.start = function () {
		function done() {
			timer.next()
		}

		var me = this
		var lastValue = null
		timer = new Timer({
			interval: 1000 * 2,
			immediate: true,
			task: function () {
				var value = global.editor.getValue()
				if (value == lastValue) {
					this.next()
					return
				}
				lastValue = value
				me.trigger('update', done, value)
			}
		})
		timer.start()
	}

	exports.immediate = function () {
		timer.immediate()
	}
})