import { TelegramWallpaper } from './telegram-wallpaper'

const wallpaper = new TelegramWallpaper({
  canvas: document.querySelector('canvas'),
  animate: true,
  scrollAnimate: true
})

console.log(wallpaper)
