define(function (require, exports) {

	var Dom = function ($dom) {
		this._$ = $dom
	}

	Dom.prototype.setIcon = function (id, iconClass) {
		this._$.set_icon(id, iconClass)
	}

})