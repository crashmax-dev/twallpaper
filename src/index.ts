import { GUI } from 'dat.gui'
import { TelegramWallpaper } from './telegram-wallpaper'

const wallpaper = new TelegramWallpaper({
  canvas: document.querySelector('canvas'),
  fps: 60,
  animate: true,
  scrollAnimate: true
})

const gui = new GUI({
  autoPlace: true,
  width: 300
})

gui.add(wallpaper, 'frametime', 1, 60, 1)

console.log(gui)
console.log(wallpaper)
