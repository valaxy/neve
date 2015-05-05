define(function (require, exports) {
	var _ = require('underscore')
	var FileModel = require('../project-manager/file-model')
	var editorWatch = require('../editor/editor-watch')
	var async = require('async')
	var Backbone = require('backbone')
	var propagation = require('backbone-event-propagation')
	var template = require('art-template')
	var minimatch = requireNode('minimatch')
	var childProcess = requireNode('child_process')


	var watchers = []
	var lis = _.extend({}, Backbone.Events, propagation.mixin())


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
		arguments        : '', // string of string of array
		checkSyntaxErrors: '',
		description      : '', // human readable string for long text
		exitCodeBehavior : '',
		fileExtension    : '',
		filter           : '', // glob matcher
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
		console.log('load ' + options.name)
	}


	var buildShellCmd = function (watcher) {
		var cmd = watcher.program + ' ' + watcher.arguments.join(' ')
		return cmd
	}


	// execute the watcher
	var execWatch = function (watcher, file, done) {
		if (watcher.script) {
			watcher.script(file, done)
		} else { // program
			var cmd = template.render(buildShellCmd(watcher))({
				name                : file.get('name'),
				nameWithoutExtension: file.get('nameWithoutExtension')
			})

			// execute program in child process
			childProcess.exec(cmd, {
				cwd: projectManager.active().get('root')
			}, function (err, stdout, stderr) {
				if (err) {
					console.error(err)
				}
				done()
			})
		}
	}

	var execWatches = function (file, callback) {
		async.eachSeries(watchers, function (watcher, done) {
			if (!watcher.filter || minimatch(file.get('path'), watcher.filter)) {
				execWatch(watcher, file, done)
			} else {
				done()
			}
		}, callback)
	}


	var projectManager
	exports.init = function (options) {
		projectManager = options.projectManager
		var editor = options.editor // todo, 这样真的好吗

		// exec when first open file
		lis.listenToPro(projectManager, 'project', 'change:openFile', function (project, file) {
			execWatches(file, function (err) {
				if (err) {
					console.log(err)
				}
			})
		})

		// exec when editor update
		lis.listenToPro(projectManager, 'file project', 'modify', function (e) { // todo, file project?????
			execWatches(e.file, function (err) {
				if (err) {
					console.log(err)
				}
			})
		})


		// todo, 不应该放在这里
		editorWatch.start({
			projectManager: projectManager,
			editor        : editor
		})
	}

	exports.watcher = watchers

})