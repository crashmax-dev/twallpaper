import { Pane, InputBindingApi } from 'tweakpane'
import { TelegramWallpaper, Options } from './telegram-wallpaper'

const colors = {
  default: ['#dbddbb', '#6ba587', '#d5d88d', '#88b884'],
  green: ['#fbe37d', '#336f55', '#fff5c5', '#7fa381'],
  pink: ['#b493e6', '#eab9d9', '#8376c2', '#e4b2ea'],
  purple: ['#4f5bd5', '#962fbf', '#dd6cb9', '#fec496']
}

const container = document.querySelector('.background_wrap')!

const options: Options = {
  fps: 15,
  opacity: 0.5,
  animate: false,
  colors: colors.purple,
  scrollAnimate: true
}

const wallpaper = new TelegramWallpaper(container, options)

const tweakpane = new Pane({
  document,
  expanded: true,
  title: 'Telegram Wallpaper'
})

tweakpane
  .addInput(options, 'fps', {
    min: 1,
    max: 360,
    step: 1
  })
  .on('change', ({ value }) => {
    wallpaper.updateFrametime(value!)
  })

tweakpane
  .addInput(options, 'opacity', {
    min: 0,
    max: 1,
    step: 0.1
  })
  .on('change', ({ value }) => {
    wallpaper.updateOpacity(value!)
  })

tweakpane
  .addInput(options, 'animate')
  .on('change', ({ value }) => {
    wallpaper.animate(value!)
  })

tweakpane
  .addInput(options, 'scrollAnimate')
  .on('change', ({ value }) => {
    wallpaper.scrollAnimate(value!)
  })

const colorsPane = tweakpane
  .addBlade({
    view: 'list',
    label: 'colors',
    value: 0,
    options: Object.keys(colors).map((text, value) => {
      return { text, value }
    })
  }) as InputBindingApi<unknown, number>

colorsPane
  .on('change', ({ value }) => {
    wallpaper.init({ container, colors: Object.values(colors)[value] })
  })

console.log(wallpaper)
console.log(tweakpane)
