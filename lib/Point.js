'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = require('./utils');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Point = function () {
  function Point(x, y) {
    _classCallCheck(this, Point);

    this.x = x;
    this.y = y;
  }

  _createClass(Point, [{
    key: 'copy',
    value: function copy() {
      return new Point(this.x, this.y);
    }
  }, {
    key: 'toIndex',
    value: function toIndex(width, height) {
      if (this.x < 0 || this.y < 0 || this.x >= width || this.y >= height) return null;
      return width * this.y + this.x;
    }
  }, {
    key: 'lerp',
    value: function lerp(point, lambda) {
      var x = this.x + lambda * (point.x - this.x);
      var y = this.y + lambda * (point.y - this.y);

      return new Point(x, y);
    }
  }, {
    key: 'dorthInfty',
    value: function dorthInfty(point) {
      var x = -(0, _utils.sign)(point.y - this.y);
      var y = (0, _utils.sign)(point.x - this.x);

      return new Point(x, y);
    }
  }, {
    key: 'ddenom',
    value: function ddenom(point) {
      var r = this.dorthInfty(point);

      return r.y * (point.x - this.x) - r.x * (point.y - this.y);
    }
  }]);

  return Point;
}();

exports.default = Point;