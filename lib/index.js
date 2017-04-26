'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Bitmap = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.traceUrl = traceUrl;
exports.traceImage = traceImage;
exports.traceCanvas = traceCanvas;

var _utils = require('./utils.js');

var _bitmapToPathList = require('./bitmapToPathList.js');

var _bitmapToPathList2 = _interopRequireDefault(_bitmapToPathList);

var _processPath = require('./processPath.js');

var _processPath2 = _interopRequireDefault(_processPath);

var _getSVG2 = require('./getSVG.js');

var _getSVG3 = _interopRequireDefault(_getSVG2);

var _getPaths2 = require('./getPaths.js');

var _getPaths3 = _interopRequireDefault(_getPaths2);

var _Bitmap = require('./Bitmap.js');

var _Bitmap2 = _interopRequireDefault(_Bitmap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OPTIONS = {
  turnpolicy: 'minority', // 'black', 'white', 'left', 'right', 'minority', 'majority'
  turdsize: 2,
  optcurve: true,
  alphamax: 1,
  opttolerance: 0.2
};

exports.Bitmap = _Bitmap2.default;
async function traceUrl(url, options) {
  var image = await (0, _utils.loadImage)(url, options);

  return traceImage(image, options);
}

function traceImage(image, options) {
  var canvas = document.createElement('canvas');
  canvas.width = image.width;
  canvas.height = image.height;

  var context = canvas.getContext('2d');
  context.drawImage(image, 0, 0);

  return traceCanvas(canvas, options);
}

function traceCanvas(canvas, options) {
  var bitmap = (0, _utils.createBitmap)(canvas);

  return new Potrace(bitmap, options);
}

var Potrace = function () {
  function Potrace(bitmap) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : OPTIONS;

    _classCallCheck(this, Potrace);

    this.bitmap = bitmap;
    this.pathList = (0, _bitmapToPathList2.default)(bitmap, options);
    (0, _processPath2.default)(this.pathList, options);
  }

  _createClass(Potrace, [{
    key: 'getPaths',
    value: function getPaths() {
      return (0, _getPaths3.default)(this.pathList);
    }
  }, {
    key: 'getSVG',
    value: function getSVG(size, optType) {
      return (0, _getSVG3.default)(this.pathList, size, optType);
    }
  }]);

  return Potrace;
}();

exports.default = Potrace;