import cloneDeep from 'lodash.clonedeep'
import { arrayColorToObject, COLORS } from './colors.js'
import { PATTERN_SIZE, PATTERNS } from './patterns.js'
import type { TWallpaperOptions } from 'twallpaper'

export const wallpaperOptions: TWallpaperOptions = {
  fps: 60,
  tails: 90,
  animate: true,
  scrollAnimate: true,
  colors: COLORS[0].colors,
  pattern: {
    image: PATTERNS[0].path,
    background: '#000',
    blur: 0,
    size: `${PATTERN_SIZE}px`,
    opacity: 0.5,
    mask: false
  }
}

export const paneOptions = {
  enablePattern: true,
  container: document.querySelector<HTMLElement>('#app')!,
  stringOptions: JSON.stringify(wallpaperOptions, null, 2),
  copyOptions: cloneDeep(wallpaperOptions),
  currentColors: arrayColorToObject(wallpaperOptions.colors),
  patternSize: PATTERN_SIZE,
  mixBlendMode: 'overlay'
}
