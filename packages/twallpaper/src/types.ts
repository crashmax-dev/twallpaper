export interface Position {
  x: number
  y: number
}

export interface RgbColor {
  r: number
  g: number
  b: number
}

export interface PatternOptions {
  image?: string
  mask?: boolean
  background?: string
  blur?: number
  size?: string
  opacity?: number
}

export interface TWallpaperOptions {
  fps?: number
  tails?: number
  colors: string[]
  animate?: boolean
  scrollAnimate?: boolean
  pattern?: PatternOptions
}
