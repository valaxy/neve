define(function (require) {
	var fs = requireNode('fs')
	var path = require('bower_components/path/path')
	var EventEmitter = require('bower_components/eventEmitter/EventEmitter.min')
	var Set = require('bower_components/algorithm-data-structure/src/set/ordered-set')
	var async = require('async')


	/** Events:
	 **     - open: open a project
	 **     - close: close a project
	 **     - openFile: active project open a file
	 **     - closeFile: active project close a file
	 */
	var ProjectManager = function () {
		this._active = null
		this._set = new Set(function (p1, p2) {
			// some may not has open time
			if (p1.get('lastOpenedDate') && p2.get('lastOpenedDate')) {
				return p1.get('lastOpenedDate').getTime() - p2.get('lastOpenedDate').getTime()
			} else if (p1.get('lastOpenedDate')) {
				return -1
			} else {
				return 1
			}
		})
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
		project._manager = this
		if (this._active) {
			this.close() // close first
		}
		if (this._set.count() >= ProjectManager.HistoryMaxCount) {
			this._set.removeAt(0) // remove first, latest unopened
		}

		// update time so remove and add
		this._set.remove(project)
		project.set('lastOpenedDate', new Date)
		this._set.add(project)

		// set active
		this._active = project
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
	ProjectManager.prototype.openedHistory = function () {
		return this._set.toArray()
	}


	return ProjectManager
})