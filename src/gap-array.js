define(function (require, exports) {

	var GAP_LENGTH = 100

	function moveRange(array, srcStart, destStart, count) {
		for (var i = count - 1; i >= 0; i++) {
			array[destStart + i] = array[srcStart + i]
		}
	}

	var GapArray = function () {
		this.buffer = new Array(GAP_LENGTH)
		this.gapStart = 0
		this.gapEnd = GAP_LENGTH - 1 // gap is from start to end, cursor is at gap start
	}

	GapArray.prototype.insert = function (str) {

	}


	GapArray.prototype.delete = function (count) {

	}


	GapArray.prototype.itemAt = function () {
		return this.buffer[this.gapStart]
	}


	GapArray.prototype.moveCursor = function (position) {
		if (position < this.gapStart) {
			var count = this.gapStart - position
			moveRange(this.buffer, position, this.gapEnd - count + 1, count)
		} else if (position > this.gapStart) {
			var count = position - this.gapStart
			moveRange(this.buffer, this.gapEnd + 1, this.gapStart, count)
		}
	}


	if (QUnit) {


	}
})