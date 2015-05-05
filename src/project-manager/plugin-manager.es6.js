define(function (require, exports) {
	var path = requireNode('path')
	var Watch = require('../file-system/watch')
	var _ = require('underscore')

	// This is project plugin

	var PluginManager = function () {
		this._plugins = []
	}


	PluginManager.prototype.init = function (project) {
		var watch = new Watch
		watch.walkAllFiles(path.join(project.get('location'), project.CONFIG_DIR_NAME), {}, (files) => {
			var keys = _.keys(files)
			for (var i = 1; i < keys.length; i++) {
				var absPath = keys[i]
				require([absPath], () => {
					this._plugins.push({})
				})
			}
		})
	}

	PluginManager.prototype.dispose = function (project) {

	}

	return PluginManager
})