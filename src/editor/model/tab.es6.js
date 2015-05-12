define(function (require) {
	var Backbone = require('backbone')
	var File = require('../../project-manager/file-model')
	require('backbone-relational')

	var Tab = Backbone.RelationalModel.extend({
		relations: [{
			type           : Backbone.HasOne,
			key            : 'file',
			relatedModel   : File,
			reverseRelation: {
				//type: Backbone.HasOne
			}
		}],

		initialize: function () {
			this.listenTo(this.get('file'), 'close', function () {
				this.destroy()
			})
		}
	})

	return Tab
})