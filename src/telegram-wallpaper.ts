interface Positions {
  x: number
  y: number
}

interface RgbColor {
  r: number
  g: number
  b: number
}

interface Options {
  canvas: HTMLCanvasElement | null
  animate?: boolean
  scrollAnimate?: boolean
}

export class TelegramWallpaper {
  private _width = 50
  private _height = 50
  private _phase = 0
  private _tail = 0
  private _tails = 90
  private _scrolltails = 50
  private _ts = 0
  private _fps = 15
  private _frametime = 1000 / this._fps
  private _scrollDelta = 0
  private _scrollTicking = false
  private _raf: ReturnType<typeof requestAnimationFrame> | null = null
  private _interval: ReturnType<typeof setInterval> | null = null
  private _hc: HTMLCanvasElement
  private _hctx: CanvasRenderingContext2D
  private _canvas: HTMLCanvasElement
  private _ctx: CanvasRenderingContext2D
  private _frames: ImageData[] = []
  private _colors: RgbColor[] = []
  private _curve = [
    0, 0.25, 0.50, 0.75, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 9, 10, 11, 12,
    13, 14, 15, 16, 17, 18, 18.3, 18.6, 18.9, 19.2, 19.5, 19.8, 20.1, 20.4, 20.7,
    21.0, 21.3, 21.6, 21.9, 22.2, 22.5, 22.8, 23.1, 23.4, 23.7, 24.0, 24.3, 24.6,
    24.9, 25.2, 25.5, 25.8, 26.1, 26.3, 26.4, 26.5, 26.6, 26.7, 26.8, 26.9, 27
  ]
  private _positions = [
    { x: 0.80, y: 0.10 },
    { x: 0.60, y: 0.20 },
    { x: 0.35, y: 0.25 },
    { x: 0.25, y: 0.60 },
    { x: 0.20, y: 0.90 },
    { x: 0.40, y: 0.80 },
    { x: 0.65, y: 0.75 },
    { x: 0.75, y: 0.40 }
  ]
  private _phases = this._positions.length

  constructor({
    canvas,
    animate,
    scrollAnimate
  }: Options) {
    if (canvas) {
      this.init(canvas)

      if (animate) {
        this.animate(animate)
      }

      if (scrollAnimate) {
        this.scrollAnimate(scrollAnimate)
      }
    }
  }

  private hexToRgb(hex: string): RgbColor | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)

    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null
  }

  private getPositions(shift: number): Positions[] {
    const positions = [...this._positions]
    while (shift > 0) {
      positions.push(positions.shift()!)
      shift--
    }

    const result = []
    for (let i = 0; i < positions.length; i += 2) {
      result.push(positions[i])
    }

    return result
  }

  private curPosition(phase: number, tail: number): Positions[] {
    tail %= this._tails
    const pos = this.getPositions(phase % this._phases)

    if (tail) {
      const next_pos = this.getPositions(++phase % this._phases)
      const d1x = (next_pos[0].x - pos[0].x) / this._tails
      const d1y = (next_pos[0].y - pos[0].y) / this._tails
      const d2x = (next_pos[1].x - pos[1].x) / this._tails
      const d2y = (next_pos[1].y - pos[1].y) / this._tails
      const d3x = (next_pos[2].x - pos[2].x) / this._tails
      const d3y = (next_pos[2].y - pos[2].y) / this._tails
      const d4x = (next_pos[3].x - pos[3].x) / this._tails
      const d4y = (next_pos[3].y - pos[3].y) / this._tails

      return [
        {
          x: pos[0].x + d1x * tail,
          y: pos[0].y + d1y * tail
        },
        {
          x: pos[1].x + d2x * tail,
          y: pos[1].y + d2y * tail
        },
        {
          x: pos[2].x + d3x * tail,
          y: pos[2].y + d3y * tail
        },
        {
          x: pos[3].x + d4x * tail,
          y: pos[3].y + d4y * tail
        }
      ]
    }

    return pos
  }

  private changeTail(diff: number): void {
    this._tail += diff

    while (this._tail >= this._tails) {
      this._tail -= this._tails
      this._phase++

      if (this._phase >= this._phases) {
        this._phase -= this._phases
      }
    }

    while (this._tail < 0) {
      this._tail += this._tails
      this._phase--

      if (this._phase < 0) {
        this._phase += this._phases
      }
    }
  }

  private onWheel(event: WheelEvent): void {
    this._scrollDelta += event.deltaY

    if (!this._scrollTicking) {
      requestAnimationFrame(() => this.drawOnWheel())
      this._scrollTicking = true
    }
  }

  private drawOnWheel(): void {
    let diff = this._scrollDelta / this._scrolltails
    this._scrollDelta %= this._scrolltails

    diff = diff > 0 ?
      Math.floor(diff) :
      Math.ceil(diff)

    if (diff) {
      this.changeTail(diff)
      const curPos = this.curPosition(this._phase, this._tail)
      this.drawGradient(curPos)
    }

    this._scrollTicking = false
  }

  private drawNextPositionAnimated(): void {
    if (this._frames.length > 0) {
      const id = this._frames.shift()!
      this.drawImageData(id)
    } else if (this._interval) {
      clearInterval(this._interval)
    }
  }

  private getGradientImageData(positions: Positions[]): ImageData {
    const id = this._hctx.createImageData(this._width, this._height)
    const pixels = id.data
    let offset = 0

    for (let y = 0; y < this._height; y++) {
      const directPixelY = y / this._height
      const centerDistanceY = directPixelY - 0.5
      const centerDistanceY2 = centerDistanceY * centerDistanceY

      for (let x = 0; x < this._width; x++) {
        const directPixelX = x / this._width

        const centerDistanceX = directPixelX - 0.5
        const centerDistance = Math.sqrt(centerDistanceX * centerDistanceX + centerDistanceY2)

        const swirlFactor = 0.35 * centerDistance
        const theta = swirlFactor * swirlFactor * 0.8 * 8.0
        const sinTheta = Math.sin(theta)
        const cosTheta = Math.cos(theta)

        const pixelX = Math.max(0.0, Math.min(1.0, 0.5 + centerDistanceX * cosTheta - centerDistanceY * sinTheta))
        const pixelY = Math.max(0.0, Math.min(1.0, 0.5 + centerDistanceX * sinTheta + centerDistanceY * cosTheta))

        let distanceSum = 0.0

        let r = 0.0
        let g = 0.0
        let b = 0.0

        for (let i = 0; i < this._colors.length; i++) {
          const colorX = positions[i].x
          const colorY = positions[i].y

          const distanceX = pixelX - colorX
          const distanceY = pixelY - colorY

          let distance = Math.max(0.0, 0.9 - Math.sqrt(distanceX * distanceX + distanceY * distanceY))
          distance = distance * distance * distance * distance
          distanceSum += distance

          r += distance * this._colors[i].r / 255
          g += distance * this._colors[i].g / 255
          b += distance * this._colors[i].b / 255
        }

        pixels[offset++] = r / distanceSum * 255.0
        pixels[offset++] = g / distanceSum * 255.0
        pixels[offset++] = b / distanceSum * 255.0
        pixels[offset++] = 0xFF
      }
    }

    return id
  }

  private drawImageData(id: ImageData): void {
    this._hctx.putImageData(id, 0, 0)
    this._ctx.drawImage(this._hc, 0, 0, 50, 50)
  }

  private drawGradient(pos: Positions[]): void {
    this.drawImageData(this.getGradientImageData(pos))
  }

  private doAnimate(): void {
    const now = +Date.now()

    if (!document.hasFocus() || now - this._ts < this._frametime) {
      this._raf = requestAnimationFrame(() => this.doAnimate())
      return
    }

    this._ts = now
    this.changeTail(1)

    const cur_pos = this.curPosition(this._phase, this._tail)
    this.drawGradient(cur_pos)

    this._raf = requestAnimationFrame(() => this.doAnimate())
  }

  private init(canvas: HTMLCanvasElement): void {
    let colors: string | string[] = (canvas.getAttribute('data-colors') || '')

    if (colors) {
      colors = colors.split(',')
    }

    for (let i = 0; i < colors.length; i++) {
      const color = this.hexToRgb(colors[i])

      if (color) {
        this._colors.push(color)
      }
    }

    if (!this._hc) {
      this._hc = document.createElement('canvas')
      this._hc.width = this._width
      this._hc.height = this._height
      this._hctx = this._hc.getContext('2d')!
    }

    this._canvas = canvas
    this._ctx = this._canvas.getContext('2d')!
    this.update()
  }

  update(): void {
    const pos = this.curPosition(this._phase, this._tail)
    this.drawGradient(pos)
  }

  toNextPosition(): void {
    if (!this._interval) {
      return
    }

    clearInterval(this._interval)
    this._frames = []

    const prev_pos = this.getPositions(this._phase % this._phases)
    this._phase++
    const pos = this.getPositions(this._phase % this._phases)

    const h = 27
    const d1x = (pos[0].x - prev_pos[0].x) / h
    const d1y = (pos[0].y - prev_pos[0].y) / h
    const d2x = (pos[1].x - prev_pos[1].x) / h
    const d2y = (pos[1].y - prev_pos[1].y) / h
    const d3x = (pos[2].x - prev_pos[2].x) / h
    const d3y = (pos[2].y - prev_pos[2].y) / h
    const d4x = (pos[3].x - prev_pos[3].x) / h
    const d4y = (pos[3].y - prev_pos[3].y) / h

    for (let frame = 0; frame < 60; frame++) {
      const cur_pos: Positions[] = [
        {
          x: prev_pos[0].x + d1x * this._curve[frame],
          y: prev_pos[0].y + d1y * this._curve[frame]
        },
        {
          x: prev_pos[1].x + d2x * this._curve[frame],
          y: prev_pos[1].y + d2y * this._curve[frame]
        },
        {
          x: prev_pos[2].x + d3x * this._curve[frame],
          y: prev_pos[2].y + d3y * this._curve[frame]
        },
        {
          x: prev_pos[3].x + d4x * this._curve[frame],
          y: prev_pos[3].y + d4y * this._curve[frame]
        }
      ]

      this._frames.push(this.getGradientImageData(cur_pos))
    }

    this._interval = setInterval(() => {
      this.drawNextPositionAnimated()
    }, 1000 / 30)
  }

  animate(start: boolean): void {
    if (!start && this._raf) {
      return cancelAnimationFrame(this._raf)
    }

    this.doAnimate()
  }

  scrollAnimate(start: boolean): void {
    if (start) {
      document.onwheel = (event) => this.onWheel(event)
    } else {
      document.onwheel = null
    }
  }
}
