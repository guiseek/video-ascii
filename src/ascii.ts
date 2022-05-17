import { ASCIIOptions } from './options'

export const ascii = (() => {
  const asciiFromCanvas = (
    canvas: HTMLCanvasElement,
    options: ASCIIOptions
  ) => {
    // Original code by Jacob Seidelin (http://www.nihilogic.dk/labs/jsascii/)
    // Heavily modified by Andrei Gheorghe (http://github.com/idevelop)
    // Strongly typed by Guilherme Siquinelli (http://github.com/guiseek)
    
    const characters = ' .,:;i1tfLCG08@'.split('')

    const context = canvas.getContext('2d')!
    const canvasWidth = canvas.width
    const canvasHeight = canvas.height

    let asciiCharacters = ''

    // calculate contrast factor
    // http://www.dfstudios.co.uk/articles/image-processing-algorithms-part-5/
    const contrastFactor =
      (259 * (options.contrast + 255)) / (255 * (259 - options.contrast))

    const imageData = context.getImageData(0, 0, canvasWidth, canvasHeight)
    for (let y = 0; y < canvasHeight; y += 2) {
      // every other row because letters are not square
      for (let x = 0; x < canvasWidth; x++) {
        // get each pixel's brightness and output corresponding character

        const offset = (y * canvasWidth + x) * 4
        const color = getColorAtOffset(imageData.data, offset)

        // increase the contrast of the image so that the ASCII representation looks better
        // http://www.dfstudios.co.uk/articles/image-processing-algorithms-part-5/

        const contrastedColor = {
          red: bound(
            Math.floor((color.red - 128) * contrastFactor) + 128,
            [0, 255]
          ),
          green: bound(
            Math.floor((color.green - 128) * contrastFactor) + 128,
            [0, 255]
          ),
          blue: bound(
            Math.floor((color.blue - 128) * contrastFactor) + 128,
            [0, 255]
          ),
          alpha: color.alpha,
        }

        // calculate pixel brightness
        // http://stackoverflow.com/questions/596216/formula-to-determine-brightness-of-rgb-color

        const brightness =
          (0.299 * contrastedColor.red +
            0.587 * contrastedColor.green +
            0.114 * contrastedColor.blue) /
          255

        const character =
          characters[
            characters.length -
              1 -
              Math.round(brightness * (characters.length - 1))
          ]

        asciiCharacters += character
      }

      asciiCharacters += '\n'
    }

    options.callback(asciiCharacters)
  }

  function getColorAtOffset(data: Uint8ClampedArray, offset: number) {
    return {
      red: data[offset],
      green: data[offset + 1],
      blue: data[offset + 2],
      alpha: data[offset + 3],
    }
  }

  function bound(value: number, interval: number[]) {
    return Math.max(interval[0], Math.min(interval[1], value))
  }

  function createOptions(
    asciiOptions: Partial<ASCIIOptions> = {}
  ): ASCIIOptions {
    return {
      contrast: asciiOptions?.contrast ?? 0,
      callback: asciiOptions?.callback ?? (() => {}),
    }
  }

  return {
    fromCanvas: (
      canvas: HTMLCanvasElement,
      asciiOptions?: Partial<ASCIIOptions>
    ) => {
      const options = createOptions(asciiOptions)

      return asciiFromCanvas(canvas, options)
    },
  }
})()
