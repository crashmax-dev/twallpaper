import { TWallpaper } from 'twallpaper'
import type { TWallpaperOptions } from 'twallpaper'
import 'twallpaper/css'

const container = document.querySelector<HTMLElement>('#app')!
const options: TWallpaperOptions = {
  animate: false,
  scrollAnimate: true,
  fps: 60,
  tails: 40,
  colors: [
    '#4f5bd5',
    '#962fbf',
    '#dd6cb9',
    '#fec496'
  ],
  pattern: {
    mask: true,
    size: '420px',
    image: 'https://twallpaper.js.org/patterns/games.svg'
  }
}

const wallpaper = new TWallpaper(container, options)
wallpaper.init()
