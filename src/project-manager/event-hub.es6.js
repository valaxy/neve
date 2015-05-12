define(function (require) {
	var Backbone = require('backbone')
	var _ = require('underscore')


	var hub = _.extend({}, Backbone.Events)

	hub.createListener = function () {
		return _.extend({}, Backbone.Events)
	}

	return hub

	/**
	 ** Events:
	 **     file:
	 **         open(file, project):
	 **         close(file, project):
	 */
})