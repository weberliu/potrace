import bitmapToPathList from './bitmapToPathList.js'
import processPath from './processPath.js'

const OPTIONS = {
  turnpolicy: 'minority', // 'black', 'white', 'left', 'right', 'minority', 'majority'
  turdsize: 2,
  optcurve: true,
  alphamax: 1,
  opttolerance: 0.2,
  color: 'black'
}

export default class Potrace {
  constructor (bitmap, options = OPTIONS) {
    this.bitmap = bitmap
    this.options = Object.assign({}, OPTIONS, options)
    this.pathList = bitmapToPathList(bitmap, this.options)
    processPath(this.pathList, this.options)
  }

  getPaths () {
    function path (curve) {
      function bezier (i) {
        var x1 = curve.c[i * 3 + 0].x
        var y1 = curve.c[i * 3 + 0].y
        var x2 = curve.c[i * 3 + 1].x
        var y2 = curve.c[i * 3 + 1].y
        var x = curve.c[i * 3 + 2].x
        var y = curve.c[i * 3 + 2].y

        return {
          type: 'CURVE',
          x1: x1,
          y1: y1,
          x2: x2,
          y2: y2,
          x: x,
          y: y
        }
      }

      function segment (i) {
        var x1 = curve.c[i * 3 + 1].x
        var y1 = curve.c[i * 3 + 1].y
        var x2 = curve.c[i * 3 + 2].x
        var y2 = curve.c[i * 3 + 2].y

        return [
          {
            type: 'POINT',
            x: x1,
            y: y1
          }, {
            type: 'POINT',
            x: x2,
            y: y2
          }
        ]
      }
      var i, s
      var p = []
      var n = curve.n
      var x = curve.c[(n - 1) * 3 + 2].x
      var y = curve.c[(n - 1) * 3 + 2].y

      p.push({
        type: 'POINT',
        x: x,
        y: y
      })

      for (i = 0; i < n; i++) {
        if (curve.tag[i] === 'CURVE') {
          p.push(bezier(i))
        } else if (curve.tag[i] === 'CORNER') {
          s = segment(i)
          p.push(s[0], s[1])
        }
      }
      // p +=
      return p
    }

    var len = this.pathlist.length
    var c, i
    var paths = []

    for (i = 0; i < len; i++) {
      c = this.pathlist[i].curve
      paths.push(path(c))
    }

    return paths
  }

  getSVG (size = 1, optType) {
    function path (curve) {
      function bezier (i) {
        var b = 'C ' + (curve.c[i * 3 + 0].x * size).toFixed(3) + ' ' +
            (curve.c[i * 3 + 0].y * size).toFixed(3) + ','
        b += (curve.c[i * 3 + 1].x * size).toFixed(3) + ' ' +
            (curve.c[i * 3 + 1].y * size).toFixed(3) + ','
        b += (curve.c[i * 3 + 2].x * size).toFixed(3) + ' ' +
            (curve.c[i * 3 + 2].y * size).toFixed(3) + ' '
        return b
      }

      function segment (i) {
        var s = 'L ' + (curve.c[i * 3 + 1].x * size).toFixed(3) + ' ' +
            (curve.c[i * 3 + 1].y * size).toFixed(3) + ' '
        s += (curve.c[i * 3 + 2].x * size).toFixed(3) + ' ' +
            (curve.c[i * 3 + 2].y * size).toFixed(3) + ' '
        return s
      }

      var i
      var n = curve.n
      var p = 'M' + (curve.c[(n - 1) * 3 + 2].x * size).toFixed(3) +
          ' ' + (curve.c[(n - 1) * 3 + 2].y * size).toFixed(3) + ' '
      for (i = 0; i < n; i++) {
        if (curve.tag[i] === 'CURVE') {
          p += bezier(i)
        } else if (curve.tag[i] === 'CORNER') {
          p += segment(i)
        }
      }
      // p +=
      return p
    }

    var w = this.bitmap.width
    var h = this.bitmap.height
    var len = this.pathList.length
    var c, i, strokec, fillc, fillrule

    var svg = '<svg id="svg" version="1.1" width="' + w + '" height="' + h +
        '" xmlns="http://www.w3.org/2000/svg">'
    svg += '<path d="'
    for (i = 0; i < len; i++) {
      c = this.pathList[i].curve
      svg += path(c)
    }
    if (optType === 'curve') {
      strokec = this.options.color
      fillc = 'none'
      fillrule = ''
    } else {
      strokec = 'none'
      fillc = this.options.color
      fillrule = ' fill-rule="evenodd"'
    }
    svg += '" stroke="' + strokec + '" fill="' + fillc + '"' + fillrule + '/></svg>'
    return svg
  }
}
