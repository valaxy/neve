define(function (require, exports) {

	var watchers = []

	/** options:
	 **     description: long text about the watcher
	 **     name: name of the watcher
	 **     program: string or a function
	 **         input: text about the input file
	 **         callback: call to write output
	 **             output: text about the output file */
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

	exports.watcher = watchers

})