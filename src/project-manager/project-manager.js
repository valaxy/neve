define(function (require) {
	var fs = requireNode('fs')
	var path = require('bower_components/path/path')
	var EventEmitter = require('bower_components/eventEmitter/EventEmitter.min')
	var Set = require('bower_components/algorithm-data-structure/src/set/set')


	var ProjectManager = function () {
		this._active = null
		this._set = new Set
	}


	ProjectManager.HistoryMaxCount = 20

	ProjectManager.prototype = new EventEmitter


	/** Check if you can create this project */
	ProjectManager.prototype.canCreate = function (project) {
		return !fs.existsSync(project.get('location'))
	}


	/** Actually create the project */
	ProjectManager.prototype.create = function (project) {
		fs.mkdirSync(project.get('location'))
		fs.mkdirSync(path.join(project.get('location'), '.neve'))
	}


	/** Open the project in neve, and trigger a `open` event */
	ProjectManager.prototype.open = function (project) {
		this._active = project
		this._set.add(project)
		this.trigger('open', [project])
	}


	/** Return current active project */
	ProjectManager.prototype.active = function () {
		return this._active
	}


	/** Return last opened projects at count of `HistoryMaxCount` */
	ProjectManager.prototype.historyRecords = function () {
		return this._set.toArray()
	}

	ProjectManager.prototype.setting = function () {

	}

	return ProjectManager
})