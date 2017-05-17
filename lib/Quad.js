"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Quad = function () {
  function Quad() {
    _classCallCheck(this, Quad);

    this.data = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  }

  _createClass(Quad, [{
    key: "at",
    value: function at(x, y) {
      return this.data[x * 3 + y];
    }
  }]);

  return Quad;
}();

exports.default = Quad;