define(function (require, exports) {
	var FileModel = require('../project-manager/file-model')
	var editorWatch = require('../editor/editor-watch')
	var async = require('async')
	var Backbone = require('backbone')
	var _ = require('underscore')
	var propagation = require('backbone-event-propagation')
	var minimatch = requireNode('minimatch')

	var watchers = []
	var event = _.extend({}, Backbone.Events, propagation.mixin())


	/** options:
	 **     description: long text about the watcher
	 **     name: name of the watcher
	 **     program: string
	 **     script: function
	 **         input: text about the input file
	 **         callback: call to write output
	 */
	exports.load = function (options = {
		isEnabled        : '',
		arguments        : '', // args
		checkSyntaxErrors: '',
		description      : '', // human readable string for long text
		exitCodeBehavior : '',
		fileExtension    : '',
		filter           : '', // regexp || glob matcher
		immediateSync    : '',
		name             : '', // human readable string for short text
		output           : '',
		outputFilters    : '',
		outputFromStdout : '',
		passParentEnvs   : '',
		program          : '', // shell command to execute
		script           : '', // js function to execute, choose program or script, script first
		scopeName        : '',
		trackOnlyRoot    : '',
		workingDir       : ''
	}) {
		watchers.push(options)
	}


	// 执行手表
	// @depreted
	var execWatches = function (text, callback) {
		async.eachSeries(watchers, function (watcher, done) {
			if (watcher.script) {
				watcher.script(text, done)
			}
		}, callback)
	}

	var execWatches2 = function (file, text, callback) {
		async.eachSeries(watchers, function (watcher, done) {
			if (watcher.filter) {
				if (minimatch(file.get('path'), watcher.filter)) {
					if (watcher.script) {
						watcher.script(text, done)
					} else {

					}
				}
			} else {
				if (watcher.script) {
					watcher.script(text, done)
				} else {

				}
			}
		}, callback)
	}


	var initForFileTree = function (fileTree) {
		event.listenToPro(fileTree, 'file', 'modify', function (file) {
			execWatches2(file, 'nothing', function () {
				console.log('all is done')
			})
		})
	}


	exports.init = function (options) {
		var projectManager = options.projectManager

		editorWatch.on('update', function (allDone, text) {
			execWatches(text, function (err) {
				allDone()
			})
		})
		editorWatch.start()

		event.listenTo(projectManager, 'open', (project) => {
			initForFileTree(project.get('fileTree'))
		})
	}

	exports.watcher = watchers

})