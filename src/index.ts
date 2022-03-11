import { Pane } from 'tweakpane'
import { colors } from './colors'
import { patterns } from './patterns'
import TelegramWallpaper from './telegram-wallpaper'
import type { ListApi } from 'tweakpane'
import type { TWOptions } from './telegram-wallpaper'

const container = document.querySelector('.background_wrap')!

const options: TWOptions = {
  fps: 60,
  blur: 0,
  opacity: 0.5,
  animate: true,
  scrollAnimate: true,
  colors: colors[0].colors,
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

const colorsList = tweakpane
  .addBlade({
    view: 'list',
    label: 'colors',
    value: 0,
    options: colors.map(({ text }, key) => {
      return {
        text,
        value: key
      }
    })
  }) as ListApi<number>

colorsList
  .on('change', ({ value }) => {
    options.colors = colors[value].colors
    wallpaper.updateColors(colors[value].colors)
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

const patternsFolder = tweakpane
  .addFolder({
    title: 'Pattern'
  })

patternsFolder
  .on('fold', ({ expanded }) => {
    options.pattern = expanded ? patterns[0].path : undefined
    wallpaper.init(options)
  })

patternsFolder
  .addInput(options, 'blur', {
    min: 0,
    max: 5,
    step: 0.1
  })
  .on('change', ({ value }) => {
    options.blur = Number(value!.toFixed(1))
    wallpaper.updateBlur(value!)
  })

patternsFolder
  .addInput(options, 'opacity', {
    min: 0,
    max: 1,
    step: 0.1
  })
  .on('change', ({ value }) => {
    options.opacity = Number(value!.toFixed(1))
    wallpaper.updateOpacity(value!)
  })

const patternsList = patternsFolder
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

patternsList
  .on('change', ({ value }) => {
    options.pattern = value
    wallpaper.init(options)
  })

tweakpane
  .addButton({ title: 'Reset' })
  .on('click', () => {
    Object.assign(options, copyOptions)
    patternsList.value = patterns[0].path
    patternsFolder.expanded = true
    tweakpane.refresh()
    wallpaper.init(options)
  })

tweakpane
  .addButton({ title: 'Export' })
  .on('click', () => {
    const blob = new Blob(
      [JSON.stringify(options, void 0, 2)],
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
