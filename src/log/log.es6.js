define(function (require) {
	var LogView = require('./log-view')
	var stack = require('stack-analysis')
	var view

	var Build = function () {
		console.log(stack())
	}

	Build.prototype.log = function (msg) {
		console.log(msg)
		view.append(msg)
	}

	Build.prototype.error = function (msg) {
		console.log(msg)
		view.append(msg)
	}

	var api = function () {
		return new Build
	}

	api.init = function () {
		view = new LogView
	}

	return api
})