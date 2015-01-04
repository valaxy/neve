module.exports = function (grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		copy: {
			main: {
				files: [
					{
						expand: true,
						cwd: '../../',
						src: ['src/**', 'bower_components/**', 'node_modules/**'],
						dest: '../../target/neve/'
					},
					{
						src: '../node-webkit-package.json',
						dest: '../../target/neve/package.json'
					}
				]
			}
		},

		zip: {
			'../../target/neve.zip': ['../../target/neve/**']
		}

	})

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-copy')
	grunt.loadNpmTasks('grunt-zip')

	// Default task(s).
	grunt.registerTask('default', ['zip'])
}
