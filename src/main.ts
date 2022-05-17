import { query } from './utils/query'
import { video } from './video'
import { ascii } from './ascii'

import './style.scss'

document.addEventListener('DOMContentLoaded', () => {
  const asciiContainer = query<'div'>('#ascii')
  let capturing = false

  video.init({
    fps: 30,
    width: 160,
    height: 120,
    mirror: true,

    onFrame: (canvas: HTMLCanvasElement) => {
      ascii.fromCanvas(canvas, {
        // contrast: 128,
        callback: (asciiString: string) => {
          asciiContainer.innerHTML = asciiString
        },
      })
    },

    onSuccess: function () {
      query<'div'>('#info')!.style.display = 'none'

      const button = query<'div'>('#button')
      button.style.display = 'block'
      button.onclick = () => {
        if (capturing) {
          video.pause()
          button.innerText = 'resume'
        } else {
          video.start()
          button.innerText = 'pause'
        }
        capturing = !capturing
      }
    },

    onError: ({ message }) => {
      console.error(message)
    },

    onNotSupported: () => {
      query<'div'>('#info')!.style.display = 'none'
      asciiContainer.style.display = 'none'
      query<'div'>('#notSupported').style.display = 'block'
    },
  })
})
