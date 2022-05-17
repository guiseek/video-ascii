export interface VideoOptions {
  fps: number
  width: number
  height: number
  mirror: any
  targetCanvas: HTMLCanvasElement | null
  onNotSupported: (...params: any) => void
  onSuccess: (...params: any) => void
  onError: (...params: any) => void
  onFrame: (canvas: HTMLCanvasElement) => void
}

export interface ASCIIOptions {
  contrast: number
  callback: (asciiString: string) => void
}
