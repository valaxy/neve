requirejs.config({
	baseUrl: '../../',

	paths: {
		'async'                     : 'bower_components/async/lib/async',
		'jquery'                    : 'bower_components/jquery/dist/jquery.min',
		'jquery-ui'                 : 'bower_components/jquery-ui/jquery-ui.min',
		'underscore'                : 'bower_components/underscore/underscore-min',
		'backbone'                  : 'bower_components/backbone/backbone',
		'backbone-relational'       : 'bower_components/backbone-relational/backbone-relational',
		'backbone-event-propagation': 'bower_components/backbone-event-propagation/index',
		'backbone.epoxy'            : 'bower_components/backbone.epoxy/backbone.epoxy',
		'backbone-computedfields'   : 'bower_components/backbone-computedfields/lib/amd/backbone.computedfields',
		'cocktail'                  : 'bower_components/cocktail/Cocktail',
		'jstree'                    : 'bower_components/jstree/dist/jstree',
		'magnific-popup'            : 'bower_components/magnific-popup/dist/jquery.magnific-popup.min',
		'javascript-state-machine'  : 'bower_components/javascript-state-machine/state-machine.min',
		'path'                      : 'bower_components/path/path',
		'bundle'                    : 'bower_components/requirejs-bundle/bundle',
		'text'                      : 'bower_components/requirejs-text/text',
		'json'                      : 'bower_components/requirejs-plugins/src/json',
		'css'                       : 'bower_components/require-css/css.min',
		'style'                     : 'src/requirejs-plugin/style',
		'html'                      : 'src/requirejs-plugin/html',
		'ace'                       : 'bower_components/ace-builds/src-noconflict/ace',
		'jquery-contextmenu'        : 'bower_components/jquery-contextmenu/contextmenu',
		'mustache'                  : 'bower_components/mustache/mustache',
		'stack-analysis'            : 'bower_components/stack-analysis/index',
		'art-template'              : 'bower_components/artTemplate/dist/template-debug',
		'URIjs'                     : 'bower_components/URIjs/src'
	},

	"valaxy/requirejs-bundle": {
		libBaseUrl: 'bower_components'
	},
	shim                     : {
		ace: {
			exports: 'ace'
		}
	}
})