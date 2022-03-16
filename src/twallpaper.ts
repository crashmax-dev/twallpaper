interface Positions {
  x: number
  y: number
}

interface RgbColor {
  r: number
  g: number
  b: number
}

type Container = HTMLElement | Element | null

export interface TWallpaperOptions {
  fps?: number
  blur?: number
  tails?: number
  pattern?: string
  colors: string[]
  opacity?: number
  animate?: boolean
  scrollAnimate?: boolean
}

const curve = [
  0, 0.25, 0.50, 0.75, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 9, 10, 11, 12,
  13, 14, 15, 16, 17, 18, 18.3, 18.6, 18.9, 19.2, 19.5, 19.8, 20.1, 20.4, 20.7,
  21, 21.3, 21.6, 21.9, 22.2, 22.5, 22.8, 23.1, 23.4, 23.7, 24.0, 24.3, 24.6,
  24.9, 25.2, 25.5, 25.8, 26.1, 26.3, 26.4, 26.5, 26.6, 26.7, 26.8, 26.9, 27
]

const positions: Positions[] = [
  { x: 0.80, y: 0.10 },
  { x: 0.60, y: 0.20 },
  { x: 0.35, y: 0.25 },
  { x: 0.25, y: 0.60 },
  { x: 0.20, y: 0.90 },
  { x: 0.40, y: 0.80 },
  { x: 0.65, y: 0.75 },
  { x: 0.75, y: 0.40 }
]

export class TWallpaper {
  private width = 50
  private height = 50
  private phase = 0
  private tail = 0
  private tails: number // 90
  private scrollTails = 50
  private timestamp: number
  private frametime: number // 1000 / 15
  private scrollDelta = 0
  private scrollTicking = false
  private frames: ImageData[] = []
  private rgb: RgbColor[] = []
  private curve = curve
  private positions = positions
  private phases = positions.length
  private interval: ReturnType<typeof setInterval> | null
  private raf: ReturnType<typeof requestAnimationFrame> | null

  private container: Container
  private hc: HTMLCanvasElement
  private hctx: CanvasRenderingContext2D
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private pattern: HTMLDivElement | null

  constructor(
    container: Container,
    options: TWallpaperOptions
  ) {
    this.init({ container, ...options })
  }

  private hexToRgb(hex: string): RgbColor | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)

    return result
      ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
      : null
  }

  private getPositions(shift: number): Positions[] {
    const positions = [...this.positions]
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
    tail %= this.tails
    const pos = this.getPositions(phase % this.phases)

    if (tail) {
      const next_pos = this.getPositions(++phase % this.phases)
      const d1x = (next_pos[0].x - pos[0].x) / this.tails
      const d1y = (next_pos[0].y - pos[0].y) / this.tails
      const d2x = (next_pos[1].x - pos[1].x) / this.tails
      const d2y = (next_pos[1].y - pos[1].y) / this.tails
      const d3x = (next_pos[2].x - pos[2].x) / this.tails
      const d3y = (next_pos[2].y - pos[2].y) / this.tails
      const d4x = (next_pos[3].x - pos[3].x) / this.tails
      const d4y = (next_pos[3].y - pos[3].y) / this.tails

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
    this.tail += diff

    while (this.tail >= this.tails) {
      this.tail -= this.tails
      this.phase++

      if (this.phase >= this.phases) {
        this.phase -= this.phases
      }
    }

    while (this.tail < 0) {
      this.tail += this.tails
      this.phase--

      if (this.phase < 0) {
        this.phase += this.phases
      }
    }
  }

  private onWheel(event: WheelEvent): void {
    if (this.interval) {
      return
    }

    this.scrollDelta += event.deltaY

    if (!this.scrollTicking) {
      requestAnimationFrame(() => this.drawOnWheel())
      this.scrollTicking = true
    }
  }

  private drawOnWheel(): void {
    let diff = this.scrollDelta / this.scrollTails
    this.scrollDelta %= this.scrollTails

    diff = diff > 0 ?
      Math.floor(diff) :
      Math.ceil(diff)

    if (diff) {
      this.changeTail(diff)
      const curPos = this.curPosition(this.phase, this.tail)
      this.drawGradient(curPos)
    }

    this.scrollTicking = false
  }

  private drawNextPositionAnimated(callback?: () => void): void {
    if (this.frames.length > 0) {
      const id = this.frames.shift()!
      this.drawImageData(id)
    } else {
      clearInterval(this.interval!)
      this.interval = null

      if (callback) {
        callback()
      }
    }
  }

  private getGradientImageData(positions: Positions[]): ImageData {
    const id = this.hctx.createImageData(this.width, this.height)
    const pixels = id.data
    let offset = 0

    for (let y = 0; y < this.height; y++) {
      const directPixelY = y / this.height
      const centerDistanceY = directPixelY - 0.5
      const centerDistanceY2 = centerDistanceY * centerDistanceY

      for (let x = 0; x < this.width; x++) {
        const directPixelX = x / this.width

        const centerDistanceX = directPixelX - 0.5
        const centerDistance = Math.sqrt(centerDistanceX * centerDistanceX + centerDistanceY2)

        const swirlFactor = 0.35 * centerDistance
        const theta = swirlFactor * swirlFactor * 0.8 * 8
        const sinTheta = Math.sin(theta)
        const cosTheta = Math.cos(theta)

        const pixelX = Math.max(0, Math.min(1, 0.5 + centerDistanceX * cosTheta - centerDistanceY * sinTheta))
        const pixelY = Math.max(0, Math.min(1, 0.5 + centerDistanceX * sinTheta + centerDistanceY * cosTheta))

        let distanceSum = 0
        let r = 0
        let g = 0
        let b = 0

        for (let i = 0; i < this.rgb.length; i++) {
          const colorX = positions[i].x
          const colorY = positions[i].y

          const distanceX = pixelX - colorX
          const distanceY = pixelY - colorY

          let distance = Math.max(0, 0.9 - Math.sqrt(distanceX * distanceX + distanceY * distanceY))
          distance = distance * distance * distance * distance
          distanceSum += distance

          r += distance * this.rgb[i].r / 255
          g += distance * this.rgb[i].g / 255
          b += distance * this.rgb[i].b / 255
        }

        pixels[offset++] = r / distanceSum * 255
        pixels[offset++] = g / distanceSum * 255
        pixels[offset++] = b / distanceSum * 255
        pixels[offset++] = 0xFF // 255
      }
    }

    return id
  }

  private drawImageData(id: ImageData): void {
    this.hctx.putImageData(id, 0, 0)
    this.ctx.drawImage(this.hc, 0, 0, this.width, this.height)
  }

  private drawGradient(pos: Positions[]): void {
    this.drawImageData(this.getGradientImageData(pos))
  }

  private requestAnimate(): void {
    this.raf = requestAnimationFrame(() => this.doAnimate())
  }

  private doAnimate(): void {
    const now = +Date.now()

    if (!document.hasFocus() || now - this.timestamp < this.frametime) {
      return this.requestAnimate()
    }

    this.timestamp = now
    this.changeTail(1)

    const cur_pos = this.curPosition(this.phase, this.tail)
    this.drawGradient(cur_pos)
    this.requestAnimate()
  }

  init({
    fps,
    blur,
    tails,
    colors,
    pattern,
    opacity,
    animate,
    container,
    scrollAnimate
  }: TWallpaperOptions & { container?: Container }): void {
    this.container = container ?? this.container

    if (!this.container || !colors.length) {
      throw new Error('Container or colors do not exist')
    }

    this.dispose()

    if (!this.hc) {
      this.hc = document.createElement('canvas')
      this.hc.width = this.width
      this.hc.height = this.height
      this.hctx = this.hc.getContext('2d')!
    }

    this.canvas = document.createElement('canvas')
    this.canvas.classList.add('background_canvas')
    this.canvas.width = this.width
    this.canvas.height = this.height
    this.ctx = this.canvas.getContext('2d')!
    this.container.appendChild(this.canvas)

    if (pattern) {
      this.pattern = document.createElement('div')
      this.pattern.classList.add('background_pattern')
      this.updateBlur(blur)
      this.updatePattern(pattern)
      this.updateOpacity(opacity)
      this.container.appendChild(this.pattern)
    }

    this.animate(animate)
    this.updateTails(tails)
    this.updateColors(colors)
    this.updateFrametime(fps)
    this.scrollAnimate(scrollAnimate)
    this.update()
  }

  dispose(): void {
    if (this.hc) {
      clearInterval(this.interval!)
      this.interval = null
      cancelAnimationFrame(this.raf!)
      this.raf = null
      this.canvas.remove()
      this.pattern?.remove()
      this.hc.remove()
      this.frames = []
    }
  }

  update(): void {
    const pos = this.curPosition(this.phase, this.tail)
    this.drawGradient(pos)
  }

  updateTails(tails = 90): void {
    if (tails > 0) {
      this.tails = tails
    }
  }

  updateFrametime(fps = 30): void {
    this.frametime = 1000 / fps
  }

  updateOpacity(opacity = 0.3): void {
    if (this.pattern) {
      this.pattern.style.opacity = opacity.toString()
    }
  }

  updatePattern(path: string): void {
    if (this.pattern) {
      this.pattern.style.backgroundImage = `url(${path})`
    }
  }

  updateBlur(blur = 0): void {
    if (this.pattern) {
      this.pattern.style.filter = `blur(${blur}px)`
    }
  }

  updateColors(colors: string[]): void {
    const rgbColors = colors.reduce<RgbColor[]>((acc, color) => {
      const rgb = this.hexToRgb(color)

      if (rgb) {
        acc.push(rgb)
      }

      return acc
    }, [])

    if (rgbColors.length > 1 && rgbColors.length < 5) {
      this.rgb = rgbColors
    } else {
      throw new Error('Required from 1-4 hex colors')
    }
  }

  toNextPosition(callback?: () => void): void {
    clearInterval(this.interval!)
    this.animate(false)
    this.frames = []

    const prev_pos = this.getPositions(this.phase % this.phases)
    this.phase++
    const pos = this.getPositions(this.phase % this.phases)

    const h = 27
    const d1x = (pos[0].x - prev_pos[0].x) / h
    const d1y = (pos[0].y - prev_pos[0].y) / h
    const d2x = (pos[1].x - prev_pos[1].x) / h
    const d2y = (pos[1].y - prev_pos[1].y) / h
    const d3x = (pos[2].x - prev_pos[2].x) / h
    const d3y = (pos[2].y - prev_pos[2].y) / h
    const d4x = (pos[3].x - prev_pos[3].x) / h
    const d4y = (pos[3].y - prev_pos[3].y) / h

    for (let frame = 0; frame < this.curve.length; frame++) {
      const cur_pos: Positions[] = [
        {
          x: prev_pos[0].x + d1x * this.curve[frame],
          y: prev_pos[0].y + d1y * this.curve[frame]
        },
        {
          x: prev_pos[1].x + d2x * this.curve[frame],
          y: prev_pos[1].y + d2y * this.curve[frame]
        },
        {
          x: prev_pos[2].x + d3x * this.curve[frame],
          y: prev_pos[2].y + d3y * this.curve[frame]
        },
        {
          x: prev_pos[3].x + d4x * this.curve[frame],
          y: prev_pos[3].y + d4y * this.curve[frame]
        }
      ]

      this.frames.push(this.getGradientImageData(cur_pos))
    }

    this.interval = setInterval(() => {
      this.drawNextPositionAnimated(callback)
    }, this.frametime)
  }

  animate(start = true): void {
    if (!start && this.raf) {
      return cancelAnimationFrame(this.raf)
    }

    this.doAnimate()
  }

  scrollAnimate(start = true): void {
    if (start) {
      document.onwheel = (event) => this.onWheel(event)
    } else {
      document.onwheel = null
    }
  }
}
