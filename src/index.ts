import { TelegramWallpaper } from './telegram-wallpaper'

const wallpaper = new TelegramWallpaper({
  canvas: document.querySelector('canvas'),
  fps: 60,
  animate: true,
  scrollAnimate: true
})

console.log(wallpaper)
