define(function (require) {
	var Backbone = require('backbone')
	var _ = require('underscore')
	return _.extend({}, Backbone.Events)

	/**
	 ** Events:
	 **     file:
	 **         open(file, project):
	 **         close(file, project):
	 */
})