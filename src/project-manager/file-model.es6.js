define(function (require) {
	var path = require('path')
	require('backbone')
	require('backbone.epoxy')
	require('backbone-computedfields')
	var propagation = require('backbone-event-propagation')
	//var Cocktail = require('cocktail')


	/** File or Directory */
	var FileModel = propagation.mixin(Backbone.RelationalModel.extend({
		defaults: {
			path: '',        // relative path of root, '.' or something2
			isDir: true,    // if it is a directory
			isOpen: false   // if it is opend by editor, multiply files can be opend at same time, imply or exply
		},

		parse: function (attrs) {
			attrs.path = path.normalize(attrs.path)
			return attrs
		},

		relations: [{
			/** Children */
			key: 'children',
			//relatedModel: FileModel, ref itself
			type: Backbone.HasMany,
			reverseRelation: {
				key: 'parent'
			}
		}],

		computed: {
			/** Get or set name of file or directory. */
			name: {
				get: function () {
					return path.basename(this.get('path'))
				},
				set: function (value) {
					var pathValue = path.join(this.get('dirpath'), value)
					this.set('path', pathValue)
				}
			},


			nameWithoutExtension: {
				depends: [],
				get: function () {
					// no imp
				}
			},


			/** Get the base directory path of file or directory.
			 ** If it's root dir, return '.' */
			dirpath: {
				get: function () {
					return path.dirname(this.get('path'))
				}
			}
		},

		propagation: 'tree',

		initialize: function () {
			this.computedFields = new Backbone.ComputedFields(this)
		},


		nameWithoutAllExtension: function () {
			// no imp
		},


		/** /aa/bb/cc -> cc */
		dirname: function () {
			return path.basename(this.dirpath())
		},

		/** Get absolute path of file or directory
		 ** @params root path, optional */
		absolutePath: function (root) {
			root = root ? root : this.get('tree').get('root')
			return path.join(root, this.get('path'))
		},

		/** Check if it is a leaf */
		isLeaf: function () {
			return this.get('children').length == 0
		},


		/** Add child and return this */
		addFile: function (child /* ... */) {
			for (var i in arguments) {
				var child = arguments[i]
				this.get('children').add(child)
			}
			return this
		},

		/** Remove the subtree whose root is this, return this */
		cut: function () {
			if (this.get('parent')) {
				return this.get('parent').get('children').remove(this)
			} else {
				return this
			}
		}
	}))

	return FileModel
})