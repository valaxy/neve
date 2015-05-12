define(function (require) {
	var $ = require('jquery')
	var TabUI = require('tab')
	var TabModel = require('../model/tab')
	var Editor = require('../model/editor')
	var hub = require('../../project-manager/event-hub')
	var TabView = require('./tab-view')

	var EditorTabView = Backbone.View.extend({
		events    : {
			'click .close': function () {
				var $li = $(this).parent()
				var $ul = $li.parent()
				var index = $ul[0].indexOf($li[0])
				this.model.get('tabs').at(index).closeFile()
			}
		},
		initialize: function () {
			var tabUI = this._tab = new TabUI
			this.setElement(tabUI.$dom)
			this.model = new Editor

			this.listenTo(hub, 'file:open', function (file) {
				var tab = this.model.addTab(new TabModel({
					file: file
				}))
				if (tab) {
					tabUI.add(new TabView({
						model: tab
					}).$el)
				} else {
					throw new Error('should open')
				}
			})
		}
	})

	return EditorTabView
})