import { toPng } from 'html-to-image'
import { TWallpaper } from 'twallpaper'
import type { TWallpaperOptions } from 'twallpaper'
import 'twallpaper/css'

const options: TWallpaperOptions = {
  animate: true,
  fps: 60,
  tails: 30,
  pattern: {
    // mask: true, // mask doesn't work
    // background: '#000',
    // blur: 0.5,
    // opacity: 0.5,
    image: 'https://twallpaper.js.org/patterns/underwater_world.svg'
  },
  colors: [
    '#527bdd',
    '#009fdd',
    '#a4dbff'
  ]
}

const app = document.querySelector<HTMLElement>('#app')!
const wallpaper = new TWallpaper(app)
wallpaper.init(options)

const button = document.createElement('button')
button.textContent = 'Export as Image'
button.addEventListener('click', exportAsImage)
document.body.appendChild(button)

async function exportAsImage() {
  const wallpaperCanvas = document.querySelector<HTMLElement>('.tw-canvas')!
  const wallpaperPattern = document.querySelector<HTMLElement>('.tw-pattern')!

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')!
  canvas.classList.add('canvas-preview')
  canvas.width = wallpaperCanvas.clientWidth
  canvas.height = wallpaperCanvas.clientHeight
  document.body.appendChild(canvas)

  const gradient = new Image()
  gradient.src = await toPng(wallpaperCanvas)
  gradient.onload = () => {
    ctx.drawImage(gradient, 0, 0)
  }

  const pattern = new Image()
  pattern.src = await toPng(wallpaperPattern)
  pattern.onload = async () => {
    ctx.globalCompositeOperation = 'multiply'
    ctx.drawImage(pattern, 0, 0)

    const image = await toPng(canvas)
    const link = document.createElement('a')
    link.download = 'twallpaper.png'
    link.href = image
    link.click()
    canvas.remove()
  }
}
