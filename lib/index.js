'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.traceUrl = exports.Bitmap = exports.Potrace = undefined;

var traceUrl = exports.traceUrl = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(url, options) {
    var image;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _utils.loadImage)(url, options);

          case 2:
            image = _context.sent;
            return _context.abrupt('return', traceImage(image, options));

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function traceUrl(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.traceImage = traceImage;
exports.traceCanvas = traceCanvas;

var _utils = require('./utils.js');

var _Bitmap = require('./Bitmap.js');

var _Bitmap2 = _interopRequireDefault(_Bitmap);

var _Potrace = require('./Potrace');

var _Potrace2 = _interopRequireDefault(_Potrace);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.Potrace = _Potrace2.default;
exports.Bitmap = _Bitmap2.default;
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