define(function (require) {
	var $ = require('jquery')
	var hub = require('../../project-manager/event-hub')
	var TabUI = require('tab')
	var TabView = require('./tab-view')
	var TabModel = require('../model/tab')
	var Editor = require('../model/editor')
	var dom = require('../../utility/dom')

	var EditorTabView = Backbone.View.extend({
		events: {
			'click tab': function (e) {
				var index = dom.orderInParent(e.currentTarget)
				this.model.set('active', this.model.get('tabs').at(index))
			}
		},

		initialize: function () {
			var tabUI = new TabUI
			this.setElement(tabUI.$dom)
			this.model = new Editor

			this.listenTo(this.model, 'add:tabs', function (tab) {
				tabUI.add(new TabView({model: tab}).$el)
				this.model.set('active', tab)
			})

			this.listenTo(this.model, 'change:active', function (editor, activeTab) {
				if (activeTab) {
					var index = this.model.indexOf(activeTab)
					tabUI.active(tabUI.getAt(index))
				}
			})


			this.listenTo(hub, 'file:open', function (file) {
				var tab = new TabModel({file: file})
				var index = this.model.indexOf(tab)
				if (index < 0) { // tab not open
					this.model.addTab(tab)
				} else { // tab has been open
					throw new Error('not implement')
				}
			})

			this.listenTo(hub, 'file:close', function (file) {
				//throw new Error('not implement')
			})
		}
	})

	return EditorTabView
})