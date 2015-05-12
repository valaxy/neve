define(function (require) {
	var $ = require('jquery')
	var hub = require('../../project-manager/event-hub')
	var TabUI = require('tab')
	var TabView = require('./tab-view')
	var TabModel = require('../model/tab')
	var Editor = require('../model/editor')

	var EditorTabView = Backbone.View.extend({
		events    : {
			'click tab': function () {

			},

			'click .close': function () {
				//var $li = $(this).parent()
				//var $ul = $li.parent()
				//var index = $ul[0].indexOf($li[0])
				//this.model.get('tabs').at(index).closeFile()
			}
		},
		initialize: function () {
			var tabUI = this._tabUI = new TabUI
			this.setElement(tabUI.$dom)
			this.model = new Editor

			this.listenTo(hub, 'file:open', function (file) {
				var tabModel = new TabModel({
					file: file
				})
				var index = this.model.indexOf(tabModel)
				if (index < 0) { // tab not open
					tabUI.add(new TabView({
						model: tabModel
					}).$el)
				} else { // tab has been open

				}
			})

			this.listenTo(this.model, 'change:active', function (activeTab) {
				if (activeTab) {
					tabUI.active(activeTab.$el)
				}
			})

			this.listenTo(hub, 'file:close', function (file) {
				//throw new Error('not implement')
			})
		}
	})

	return EditorTabView
})