define(function (require, exports) {
	var editorWatch = require('../editor/editor-watch')
	var async = require('async')
	var Backbone = require('backbone')
	var _ = require('underscore')

	var watchers = []

	/** options:
	 **     description: long text about the watcher
	 **     name: name of the watcher
	 **     program: string
	 **     script: function
	 **         input: text about the input file
	 **         callback: call to write output
	 */
	exports.load = function (options = {
		isEnabled: '',
		arguments: '',              // args
		checkSyntaxErrors: '',
		description: '',
		exitCodeBehavior: '',
		fileExtension: '',
		immediateSync: '',
		name: '',                   // watch name
		output: '',
		outputFilters: '',
		outputFromStdout: '',
		passParentEnvs: '',
		program: '',                // cmd to execute
		scopeName: '',
		trackOnlyRoot: '',
		workingDir: ''
	}) {
		watchers.push(options)
	}


	exports.init = function (options) {
		var projectManager = options.projectManager
		var event = _.extend({}, Backbone.Events)

		editorWatch.on('update', function (allDone, text) {
			async.eachSeries(watchers, function (watcher, done) {
				if (watcher.script) {
					watcher.script(text, done)
				}
			}, function (err) {
				allDone()
			})
		})
		editorWatch.start()

		event.listenTo(projectManager, 'open', (project) => {

		})

		event.listenTo(projectManager, 'close', () => {

		})
	}

	exports.watcher = watchers

})