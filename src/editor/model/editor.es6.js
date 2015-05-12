define(function (require) {
	var Tab = require('./tab')
	var Backbone = require('backbone')
	require('backbone-relational')

	var Editor = Backbone.RelationalModel.extend({
		relations: [{
			type           : Backbone.HasMany,
			key            : 'tabs',
			relatedModel   : Tab,
			reverseRelation: {}
		}, {
			type           : Backbone.HasOne,
			key            : 'active',
			relatedModel   : Tab,
			reverseRelation: {
				type: Backbone.HasOne
			}
		}],

		addTab: function (tab) {
			var index = this.indexOf(tab)
			if (index < 0) {
				return this.get('tabs').add(tab)
			} else {
				return false
			}
		},

		indexOf: function (tab) {
			for (var i = 0; i < this.get('tabs').length; i++) {
				var t = this.get('tabs').at(i)
				if (tab.get('file').id == t.get('file').id) {
					return i
				}
			}
			return -1
		}
	})

	return Editor
})