import { loadImage, createBitmap } from './utils.js'

import Bitmap from './Bitmap.js'
import Potrace from './Potrace'

export { Potrace, Bitmap }

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
