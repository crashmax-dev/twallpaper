import { TWallpaper } from 'twallpaper'
import type { TWallpaperOptions } from 'twallpaper'
import 'twallpaper/css'

const app = document.querySelector('#app')!

const wallpaper = new TWallpaper(app)
const options: TWallpaperOptions = {
  fps: 60,
  tails: 30,
  colors: wallpaper.generateColors(),
  pattern: {
    image: 'https://twallpaper.js.org/patterns/games.svg'
  }
}
wallpaper.init(options)

function toggleMask(mask: boolean): void {
  wallpaper.updatePattern({
    ...options.pattern,
    mask
  })
}

// Emulate `prefers-color-scheme` media query in Google Chrome
// https://stackoverflow.com/a/59223868
if (window.matchMedia) {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  toggleMask(mediaQuery.matches)

  mediaQuery.addEventListener('change', (event) => {
    toggleMask(event.matches)
  })
}
