import { toPng } from 'html-to-image'
import { TWallpaper } from 'twallpaper'
import type { TWallpaperOptions } from 'twallpaper'
import 'twallpaper/css'

const options: TWallpaperOptions = {
  animate: true,
  fps: 60,
  tails: 30,
  pattern: {
    // mask: true,
    // background: '#000',
    // opacity: 0.5,
    // blur: 0,
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

const exportImage = document.createElement('button')
exportImage.textContent = 'Export as Image'
exportImage.addEventListener('click', saveImage)

async function saveImage() {
  document.querySelector('.canvas-preview')?.remove()

  const wallpaperCanvas = app.querySelector('canvas')!
  const wallpaperPattern = app.querySelector('div')!

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')!
  canvas.classList.add('canvas-preview')
  canvas.width = wallpaperCanvas.clientWidth
  canvas.height = wallpaperCanvas.clientHeight
  document.body.appendChild(canvas)

  const gradient = await toPng(wallpaperCanvas)
  const gradientImage = new Image()
  gradientImage.src = gradient
  gradientImage.onload = () => {
    ctx.drawImage(gradientImage, 0, 0)
  }

  const pattern = await toPng(wallpaperPattern, {
    backgroundColor: 'transparent'
  })
  const patternImage = new Image()
  patternImage.src = pattern
  patternImage.onload = async () => {
    ctx.globalCompositeOperation = 'multiply'
    ctx.drawImage(patternImage, 0, 0)

    const image = await toPng(canvas)
    const link = document.createElement('a')
    link.download = 'twallpaper.png'
    link.href = image
    link.click()
  }
}

document.body.appendChild(exportImage)
