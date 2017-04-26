import { loadImage, createBitmap } from './utils.js'
import bitmapToPathList from './bitmapToPathList.js'
import processPath from './processPath.js'
import getSVG from './getSVG.js'
import getPaths from './getPaths.js'
import Bitmap from './Bitmap.js'

const OPTIONS = {
  turnpolicy: 'minority', // 'black', 'white', 'left', 'right', 'minority', 'majority'
  turdsize: 2,
  optcurve: true,
  alphamax: 1,
  opttolerance: 0.2
}

export { Bitmap }

export async function traceUrl (url, options) {
  const image = await loadImage(url, options)

  return traceImage(image, options)
}

export function traceImage (image, options) {
  const canvas = document.createElement('canvas')
  canvas.width = image.width
  canvas.height = image.height

  const context = canvas.getContext('2d')
  context.drawImage(image, 0, 0)

  return traceCanvas(canvas, options)
}

export function traceCanvas (canvas, options) {
  const bitmap = createBitmap(canvas)

  return new Potrace(bitmap, options)
}

export default class Potrace {
  constructor (bitmap, options = OPTIONS) {
    this.bitmap = bitmap
    this.pathList = bitmapToPathList(bitmap, options)
    processPath(this.pathList, options)
  }

  getPaths () {
    return getPaths(this.pathList)
  }

  getSVG (size, optType) {
    return getSVG(this.pathList, size, optType)
  }
}
