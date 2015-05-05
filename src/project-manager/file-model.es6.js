define(function (require) {
	var path = requireNode('path') // todo, 换成require('path'), 因为不能智能识别\\的问题
	var id = require('../utility/id')
	var Backbone = require('backbone')
	var propagation = require('backbone-event-propagation')
	var _ = require('underscore')
	require('backbone-relational')
	require('backbone-computedfields')


	/** File or Directory */
	var FileModel = propagation.mixin(Backbone.RelationalModel.extend({}, {
		createByStat: function (path, stat) {
			return new FileModel({
				path        : path,
				isDir       : stat.isDirectory(),
				modifiedTime: stat.mtime
			})
		}
	})) // purpose is for ref FileModel itself
	_.extend(FileModel.prototype, {
		defaults: function () {
			return {
				id          : id(),
				path        : '',        // relative path of root, '.' or something2
				isDir       : true,     // if it is a directory
				isOpen      : false,    // if it is opend by editor, multiply files can be opend at same time, imply or exply
				modifiedTime: null,
				value       : null      // text in the editor
			}
		},

		parse: function (attrs) {
			attrs.path = path.normalize(attrs.path)
			return attrs
		},

		relations: [{
			/** Children */
			key            : 'children',
			relatedModel   : FileModel,
			type           : Backbone.HasMany,
			reverseRelation: {
				key: 'parent'
			}
		}],

		computed: {
			/** File name or Directory name. todo: 重构name和path, 应该保存name而不是保存path
			 **/
			name: {
				depends: ['path'],
				get    : function (fields) {
					return path.basename(fields.path)
				},
				set    : function (value, fields) {
					var pathValue = path.join(this.get('dirpath'), value)
					fields.path = pathValue
					return this
				}
			},


			/** index.html    -> 'html'
			 ** index.html.md -> 'md'
			 ** index.        -> ''
			 ** .             -> ''
			 */
			extension: {
				depends: ['name'],
				get    : function (fields) {
					var ext = path.extname(fields.name)
					return ext == '' || ext == '.' ? '' : ext.substr(1)
				}
			},


			/** index.html    -> 'html'
			 ** index.html.md -> 'html.md'
			 ** index.        -> ''
			 ** .             -> ''
			 */
			allExtensions: {
				depends: ['name'],
				get    : function (fields) {
					var name = fields.name
					var total = ''
					while (true) {
						var ext = path.extname(name)
						if (ext == '' || ext == '.') {
							break
						} else {
							name = path.basename(name, ext)
							total = ext.substr(1) + '.' + total
						}
					}
					return total == '' ? total : total.substr(0, total.length - 1)
				}
			},


			/** index.html    -> index
			 ** index.html.md -> index.html
			 ** index.        -> index
			 ** index         -> index
			 ** .             -> ''
			 */
			nameWithoutExtension: {
				depends: ['name', 'extension'],
				get    : function (fields) {
					return path.basename(fields.name, '.' + fields.extension)
				}
			},


			/** index.html    -> index
			 ** index.html.md -> index
			 ** index.        -> index
			 ** index         -> index
			 ** .             -> ''
			 */
			nameWithoutAllExtension: {
				depends: ['name', 'allExtensions'],
				get    : function (fields) {
					return path.basename(fields.name, '.' + fields.allExtensions)
				}
			},


			/** Get the base directory path of file or directory.
			 ** If it's root dir, return '.' */
			dirpath: {
				depends: ['path'],
				get    : function (fields) {
					return path.dirname(fields.path)
				}
			}
		},

		propagation: {
			name   : 'file',
			targets: 'openedProject'
		},

		initialize: function () {
			this.computedFields = new Backbone.ComputedFields(this)
			//this.set('id', new Date() + '-' + id++)
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
		},

		modify: function (stat, value) {
			if (stat) {
				this.set('modifiedTime', stat.mtime)
			}
			if (typeof value == 'string') {
				this.set('value', value)
			}
			this.trigger('modify')
		}
	})

	return FileModel
})