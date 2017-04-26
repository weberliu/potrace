# POTRACE
Based on http://potrace.sourceforge.net and https://github.com/kilobtye/potrace and https://github.com/casperlamboo/potrace.

Converts bitmap images to vector paths.

# Usage

### Using NPM (CommonJS module)

Install the library.

```
npm install js-potrace
```

Include the library.

```javascript
import { Potrace, traceUrl, traceImage, traceCanvas } from 'js-potrace'
```

# API

**Options**

```javascript
{
  turnpolicy: enum('black' | 'white' | 'left' | 'right' | 'minority' | 'majority'),
  turdsize: Float,
  optcurve: Bool,
  alphamax: Float,
  opttolerance: Float,
  color: String
}
```
  - turnpolicy: how to resolve ambiguities in path decomposition. (default: "minority")
  - turdsize: suppress speckles of up to this size (default: 2)
  - optcurve: turn on/off curve optimization (default: true)
  - alphamax: corner threshold parameter (default: 1)
  - opttolerance: curve optimization tolerance (default: 0.2)
  - color: The stroke or fill color (default: 'black')

## Functions

**traceUrl**

Traces a given image from url.

```javascript
traceUrl(url: String, [ options: Object ])
  .then(trace => {
    trace.getSVG(1)
  })
```
  - url: path to the image
  - options: trace options

*.traceImage**

Traces a given image.

```javascript
var trace = traceImage(image: HTMLImageElement, [ options: Object ])
trace.getSVG('1')
```
  - image: image containing the image
  - options: trace options

**traceCanvas**

Traces a given canvas.

```javascript
var trace = traceCanvas(canvas: HTMLCanvasElement, [ options: Object ])
trace.getSVG()
```
  - canvas: canvas containing the image
  - options: trace options

## Portrace

Traces a given bitmap.

  ```javascript
  import {Potrace} from 'js-potrace'

  var trace = new Potrace(bitmap, [ options: Object ])
  ```
    - bitmap: bitmap containing image info (1 and 0 values)
    - options: trace options

### Methods

**getSVG**

Converts trace result to svg.

```javascript
var trace = new Potrace(bitmap, [ options: Object ])
svg： String = trace.getSVG([size, curve])
```

**getPaths**

Converts trace result to readable paths.

```javascript
var trace = new Potrace(bitmap, [ options: Object ])
svg: String = trace.getPaths()
```
