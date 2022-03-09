import { Pane, ListApi } from 'tweakpane'
import TelegramWallpaper, { TWOptions } from './telegram-wallpaper'

const colors = {
  default: ['#dbddbb', '#6ba587', '#d5d88d', '#88b884'],
  green: ['#fbe37d', '#336f55', '#fff5c5', '#7fa381'],
  pink: ['#b493e6', '#eab9d9', '#8376c2', '#e4b2ea'],
  purple: ['#4f5bd5', '#962fbf', '#dd6cb9', '#fec496']
}

const patternPath = location.href + 'patterns/'
const patterns = [
  {
    text: 'Cat and Dog',
    path: patternPath + 'cat_and_dog.svg'
  },
  {
    text: 'Mythical',
    path: patternPath + 'mythical.svg'
  },
  {
    text: 'Star Wars',
    path: patternPath + 'star_wars.svg'
  },
  {
    text: 'Math',
    path: patternPath + 'math.svg'
  }
]

const container = document.querySelector('.background_wrap')!

const toggleOptions = {
  patterns: true
}

const options: TWOptions = {
  fps: 60,
  opacity: 0.5,
  animate: true,
  scrollAnimate: true,
  colors: colors.default,
  pattern: patterns[0].path
}

const copyOptions = { ...options }

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
    options.opacity = Number(value!.toFixed(1))
    wallpaper.updateOpacity(value!)
  })

const colorsPane = tweakpane
  .addBlade({
    view: 'list',
    label: 'colors',
    value: 'default',
    options: Object.keys(colors).map((text) => {
      return {
        text,
        value: text
      }
    })
  }) as ListApi<keyof typeof colors>

colorsPane
  .on('change', ({ value }) => {
    options.colors = colors[value]
    wallpaper.init(options)
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

tweakpane
  .addInput(toggleOptions, 'patterns')
  .on('change', ({ value }) => {
    options.pattern = value ? patterns[0].path : undefined
    patternsPane.disabled = !value
    wallpaper.init(options)
  })

const patternsPane = tweakpane
  .addBlade({
    view: 'list',
    value: patterns[0].path,
    options: patterns.map(({ path, text }) => {
      return {
        text,
        value: path
      }
    })
  }) as ListApi<string>

patternsPane
  .on('change', ({ value }) => {
    options.pattern = value
    wallpaper.init(options)
  })

tweakpane.addSeparator()

tweakpane
  .addButton({ title: 'Reset' })
  .on('click', () => {
    Object.assign(options, copyOptions)
    patternsPane.value = patterns[0].path
    toggleOptions.patterns = true
    tweakpane.refresh()
    wallpaper.init(options)
  })

tweakpane
  .addButton({ title: 'Export' })
  .on('click', () => {
    const blob = new Blob([
      JSON.stringify(options, void 0, 2)],
      { type: 'text/plain' }
    )

    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'telegram-wallpaper-options.json'
    link.click()
    link.remove()
  })

console.log(wallpaper)
console.log(tweakpane)
