'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Bitmap = exports.Potrace = undefined;
exports.traceUrl = traceUrl;
exports.traceImage = traceImage;
exports.traceCanvas = traceCanvas;

var _utils = require('./utils.js');

var _Bitmap = require('./Bitmap.js');

var _Bitmap2 = _interopRequireDefault(_Bitmap);

var _Potrace = require('./Potrace');

var _Potrace2 = _interopRequireDefault(_Potrace);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Potrace = _Potrace2.default;
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

  return new _Potrace2.default(bitmap, options);
}