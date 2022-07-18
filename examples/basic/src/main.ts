import { TWallpaper } from 'twallpaper'
import type { TWallpaperOptions } from 'twallpaper'
import 'twallpaper/dist/twallpaper.css'

const container = document.querySelector('#app')
const options: TWallpaperOptions = {
  colors: [
    '#4f5bd5',
    '#962fbf',
    '#dd6cb9',
    '#fec496'
  ]
}

const wallpaper = new TWallpaper(container, options)
wallpaper.init()
