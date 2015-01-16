define(function (require, exports) {
	var global = require('../home/global')
	var Timer = require('bower_components/timer/src/timer')

	_.extend(exports, Backbone.Events)

	// control the watch frequency
	// when code update trigger a 'update' event
	exports.start = function () {
		function done() {
			timer.next()
		}

		var me = this
		var lastValue = null
		var timer = new Timer({
			interval: 1000 * 4,
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
})