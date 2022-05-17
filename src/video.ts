import { VideoOptions } from './options'

export const video = (() => {
  let options: VideoOptions

  let video: HTMLVideoElement
  let canvas: HTMLCanvasElement
  let context: CanvasRenderingContext2D
  let renderTimer: number

  const initVideoStream = () => {
    video = document.createElement('video')
    video.setAttribute('width', options.width + '')
    video.setAttribute('height', options.height + '')
    video.setAttribute('playsinline', 'true')
    video.setAttribute('webkit-playsinline', 'true')

    if ('getUserMedia' in navigator.mediaDevices) {
      navigator.mediaDevices
        .getUserMedia({
          video: true,
          audio: false,
        })
        .then((stream) => {
          options.onSuccess()

          video.srcObject = stream

          initCanvas()
        })
        .catch(options.onError)

    } else {
      options.onNotSupported()
    }
  }

  function initCanvas() {
    canvas = options.targetCanvas || document.createElement('canvas')
    canvas.setAttribute('width', options.width + '')
    canvas.setAttribute('height', options.height + '')

    context = canvas.getContext('2d')!

    // mirror video
    if (options.mirror) {
      context.translate(canvas.width, 0)
      context.scale(-1, 1)
    }
  }

  function startCapture() {
    video.play()

    renderTimer = setInterval(function () {
      try {
        context.drawImage(video, 0, 0, video.width, video.height)
        options.onFrame(canvas)
      } catch (e) {
        // TODO
      }
    }, Math.round(1000 / options.fps))
  }

  function stopCapture() {
    pauseCapture()

    video.srcObject = null
  }

  function pauseCapture() {
    if (renderTimer) clearInterval(renderTimer)
    video.pause()
  }

  function createOptions(options: Partial<VideoOptions> = {}): VideoOptions {
    const doNothing = () => null
    return {
      fps: options.fps ?? 30,
      width: options.width ?? 640,
      height: options.height ?? 480,
      mirror: options.mirror ?? false,
      targetCanvas: options.targetCanvas ?? null,
      onSuccess: options.onSuccess ?? doNothing,
      onError: options.onError ?? doNothing,
      onNotSupported: options.onNotSupported ?? doNothing,
      onFrame: options.onFrame ?? doNothing,
    }
  }

  return {
    init: (captureOptions: Partial<VideoOptions>) => {
      options = createOptions(captureOptions)

      initVideoStream()
    },

    start: startCapture,

    pause: pauseCapture,

    stop: stopCapture,
  }
})()
