define(function (require, exports) {
	var Backbone = require('backbone')

	/** Class has listenTo */
	exports.mixin = function (Class) {
		var oldListenTo = Class.prototype.listenTo

		Class.prototype.listenTo = function (event) {
			oldListenTo.apply(this, arguments)

			if (event instanceof Backbone.Model) {

			}

			return this
		}

		return Class
	}
})