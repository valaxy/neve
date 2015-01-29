define(function (require) {
	var fs = requireNode('fs')
	var path = require('bower_components/path/path')
	var EventEmitter = require('bower_components/eventEmitter/EventEmitter.min')
	var Set = require('bower_components/algorithm-data-structure/src/set/set')
	var async = require('async')


	/** Events: open, close */
	var ProjectManager = function () {
		this._active = null
		this._set = new Set
	}


	ProjectManager.HistoryMaxCount = 20

	ProjectManager.prototype = new EventEmitter


	/** Check if you can create this project */
	ProjectManager.prototype.isExist = function (project) {
		return fs.existsSync(project.get('location'))
	}


	/** Actually create the project */
	ProjectManager.prototype.create = function (project, callback) {
		async.series([
			function (done) {
				fs.mkdir(project.get('location'), function (err) {
					done(err)
				})
			},
			function (done) {
				fs.mkdir(path.join(project.get('location'), '.neve'), function (err) {
					done(err)
				})
			}
		], function (err) {
			callback(err)
		})
	}


	/** Open the project in neve, and trigger a `open` event */
	ProjectManager.prototype.open = function (project) {
		this._active = project
		this._set.add(project)
		this.trigger('open', [project])
	}


	/** Close current active project */
	ProjectManager.prototype.close = function () {
		var orignal = this._active
		this._active = null
		this.trigger('close', [orignal])
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