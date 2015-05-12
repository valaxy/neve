define(function (require) {
	var fs = requireNode('fs')
	var $ = require('jquery')
	var Backbone = require('backbone')
	//var ace = require('ace')
	var loader = require('../loader/index')
	var autoSave = require('./plugin/auto-save')

	var dom = require('../utility/dom')
	var html = require('html!./index')
	var css = require('style!./index')

	var propagation = require('backbone-event-propagation')
	var hub = require('../project-manager/event-hub')


	const EXTENSION_TO_MODE = {
		js: 'javascript',
		md: 'markdown'
	}

	var Editor = propagation.mixin(Backbone.View.extend({
		_onOpenFile: function (project, file) {
			this.$el.show()
			var content = fs.readFileSync(file.absolutePath(project.get('location')), {
				encoding: 'utf-8'
			})

			this._editor.setValue(content)
		},

		_onCloseFile: function (project, file) {
			this.$el.hide()
		},

		getValue: function () {
			return this._editor.getValue()
		},

		initialize: function (options) {
			var me = this
			this.setElement($(html))
			dom.appendStyle(this.el, css)

			var projectManager = options.projectManager
			var editor = window.editor = this._editor = ace.edit(this.$('.ace')[0])
			aceShim.addEditor(editor, {
				cssHead: this.el
			})
			this._editor = editor


			editor.setTheme("ace/theme/chrome")
			//editor.renderer.setShowGutter(false)
			editor.setOptions({
				maxLines: 50
			})


			//--------------------init ace------------------------------
			// set to false to prevent using worker, which is needed to run this from local html file due to browser security restritions
			var useWebWorker = true;
			editor.getSession().setUseWorker(useWebWorker);

			//#region not relevant to tern, just some deafults I prefer
			editor.getSession().setUseWrapMode(true);
			editor.getSession().setWrapLimitRange(null, null);
			editor.setShowPrintMargin(false);
			//#endregion


			ace.config.loadModule('ace/ext/language_tools', function () {
				ace.config.loadModule('ace/ext/tern', function () {
					editor.setOptions({
						/**
						 * Either `true` or `false` or to enable with custom options pass object that
						 * has options for tern server: http://ternjs.net/doc/manual.html#server_api
						 * If `true`, then default options will be used
						 */
						enableTern               : {
							/* http://ternjs.net/doc/manual.html#option_defs */
							defs       : ['browser', 'ecma5'],
							/* http://ternjs.net/doc/manual.html#plugins */
							plugins    : {
								doc_comment: {
									fullDocs: true
								}
							},
							/**
							 * (default is true) If web worker is used for tern server.
							 * This is recommended as it offers better performance, but prevents this from working in a local html file due to browser security restrictions
							 */
							useWorker  : useWebWorker,
							/* if your editor supports switching between different files (such as tabbed interface) then tern can do this when jump to defnition of function in another file is called, but you must tell tern what to execute in order to jump to the specified file */
							switchToDoc: function (name, start) {
								console.log('switchToDoc called but not defined. name=' + name + '; start=', start);
							},
							/**
							 * if passed, this function will be called once ternServer is started.
							 * This is needed when useWorker=false because the tern source files are loaded asynchronously before the server is started.
							 */
							startedCb  : function () {
								//once tern is enabled, it can be accessed via editor.ternServer
								console.log('editor.ternServer:', editor.ternServer);
							}
						},
						/**
						 * when using tern, it takes over Ace's built in snippets support.
						 * this setting affects all modes when using tern, not just javascript.
						 */
						enableSnippets           : false,
						/**
						 * when using tern, Ace's basic text auto completion is enabled still by deafult.
						 * This settings affects all modes when using tern, not just javascript.
						 * For javascript mode the basic auto completion will be added to completion results if tern fails to find completions or if you double tab the hotkey for get completion (default is ctrl+space, so hit ctrl+space twice rapidly to include basic text completions in the result)
						 */
						enableBasicAutocompletion: true
					});

					editor._tooltipContainer = me.el
					ace.config.loadModule('ace/autocomplete/popup', function (m) {
						var AcePopup = m.AcePopup

						ace.config.loadModule('ace/autocomplete', function (m) {
							var Autocomplete = m.Autocomplete
							var oldInit = Autocomplete.prototype.$init
							Autocomplete.prototype.$init = function () {
								this.popup = new AcePopup(me.el)
								// ForTern - popup signals 'select' when completion row is changed
								/* this.popup.on('select', function () {
								 // logO(event, 'event');
								 //this._signal('select');
								 //event._signal('autocompleteselect');
								 if (this.completionChangeHandler) {
								 this.completionChangeHandler();
								 }
								 });*/
								this.popup.on("click", function (e) {
									this.insertMatch();
									e.stop();
								}.bind(this));
							}
						})
					})

				});
			});

			//#region not relevant to tern (custom beautify plugin)
			ace.config.loadModule('ace/ext/html_beautify', function () {
				editor.setOptions({
					autoBeautify: true
				});
			});
			//#endregion

			//-----------------------------------------------------------


			// set content
			this.listenTo(hub, 'file:open', (file) => {
				var content = fs.readFileSync(file.absolutePath(), {
					encoding: 'utf-8'
				})
				this._editor.setValue(content)
			})


			// set mode
			this.listenTo(hub, 'file:open', function (file) {
				var extension = file.get('extension')
				if (extension) {
					this._editor.getSession().setMode('ace/mode/' + EXTENSION_TO_MODE[extension])
				} else {
					console.warn('no extension')
				}
			})


			autoSave.init({
				projectManager: projectManager
			})


			// This is about tabs
			var editorTabView = new (require('./editor-tab/view'))
			this.$('.ace').before(editorTabView.el)
		}
	}))

	return Editor
})


// check: https://github.com/Juicy/juicy-ace-editor/pull/3
//var session = editor.getSession()
//session.on('changeMode', function () {
//var mode = session.getMode()
//console.log(mode)
//})
//
//editor.renderer.addEventListener("themeLoaded", (e) => { // todo, 可以在load之前劫持吗?
//var theme = document.getElementById(e.theme.cssClass) // cssClass is a id actually
//this.el.appendChild(theme)
//})
