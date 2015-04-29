define(function (require) {
	var LogView = require('./log-view')
	var stack = require('stack-analysis')
	var URI = require('URIjs/URI')
	var view

	var pluginDirs = [
		'/src/plugin/',
		'/src/'
	]

	var Build = function () {
		var info = stack()
		for (var i = 0; i < info.length; i++) {
			var uri = new URI(info[i].url)

			for (var j = 0; j < pluginDirs.length; j++) {
				var pluginDir = pluginDirs[j]
				var m = new URI(uri.pathname()).relativeTo(pluginDir)
				var n = m.toString()
				if (n[0] != '.' && n != 'log/log.js') { // is not sub dir and this file
					this._name = m.directory()
					return
				}
			}
		}
	}

	var getTime = function () {
		var now = new Date
		return '[' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds() + ']'
	}

	Build.prototype.log = function (msg) {
		view.append('[' + this._name + '] ' + getTime() + ' ' + msg)
	}

	Build.prototype.error = function (msg) {
		view.append('[' + this._name + '] ' + getTime() + ' ' + msg)
	}

	var api = function () {
		return new Build
	}

	api.init = function () {
		view = new LogView
	}

	return api
})