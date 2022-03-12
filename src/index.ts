import { Pane } from 'tweakpane'
import { patterns } from './patterns'
import { colors, mapColors } from './colors'
import TelegramWallpaper from './telegram-wallpaper'
import type { TWOptions } from './telegram-wallpaper'
import type { ListApi, InputBindingApi } from 'tweakpane'

const options: TWOptions = {
  fps: 60,
  blur: 0,
  opacity: 0.5,
  animate: true,
  scrollAnimate: true,
  colors: colors[0].colors,
  pattern: patterns[0].path
}

const data = {
  container: document.querySelector('.background_wrap')!,
  stringOptions: JSON.stringify(options, null, 2),
  copyOptions: { ...options },
  currentColors: mapColors(0)
}

const { container, copyOptions } = data
const wallpaper = new TelegramWallpaper(container, options)

const tweakpane = new Pane({
  document,
  expanded: true,
  title: document.title
})

tweakpane.on('change', () => refreshPaneConsole())

function refreshPaneConsole() {
  data.stringOptions = JSON.stringify(options, null, 2)
  consoleButtonCopy.title = 'Copy'
  consolePane.refresh()
}

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
  .addInput(options, 'animate')
  .on('change', ({ value }) => {
    wallpaper.animate(value!)
  })

tweakpane
  .addInput(options, 'scrollAnimate')
  .on('change', ({ value }) => {
    wallpaper.scrollAnimate(value!)
  })

/** color */
const colorsInput: InputBindingApi<unknown, string>[] = []

const colorsFolder = tweakpane
  .addFolder({
    title: 'Color'
  })

const colorsList = colorsFolder
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
    data.currentColors = mapColors(value)
    generateColorsInput()
  })

function generateColorsInput(): void {
  const inputs = data.currentColors.map((color, key) => {
    const input = colorsFolder
      .addInput(color, key, {
        label: `color ${key + 1}`
      })

    input
      .on('change', ({ value }) => {
        color[key] = value
        options.colors = data.currentColors.map((color, key) => color[key])
        wallpaper.updateColors(options.colors)
      })

    input.controller_.view.labelElement.remove()
    input.controller_.view.valueElement.style.width = '100%'

    return input
  })

  colorsInput.forEach((input) => input.dispose())
  colorsInput.splice(0, colorsInput.length)
  colorsInput.push(...inputs)
}

generateColorsInput()

/** pattern */
const patternsFolder = tweakpane
  .addFolder({ title: 'Pattern' })

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
    options.blur = Number(value!.toPrecision(1))
    wallpaper.updateBlur(options.blur)
  })

patternsFolder
  .addInput(options, 'opacity', {
    min: 0,
    max: 1,
    step: 0.1
  })
  .on('change', ({ value }) => {
    options.opacity = Number(value!.toPrecision(1))
    wallpaper.updateOpacity(options.opacity)
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
    wallpaper.updatePattern(value)
  })

/** export */
const exportFolder = tweakpane
  .addFolder({
    title: 'Export',
    expanded: false
  })

const consolePane = exportFolder
  .addMonitor(data, 'stringOptions', {
    interval: 0,
    lineCount: data.stringOptions.split('\n').length,
    multiline: true
  })

const consoleTextarea = consolePane.controller_.view.valueElement
  .querySelector('textarea')!

consolePane.controller_.view.labelElement
  .remove()

consolePane.controller_.view.valueElement.style.width = '100%'
consoleTextarea.style.overflow = 'hidden'

const consoleButtonCopy = exportFolder
  .addButton({ title: 'Copy' })

consoleButtonCopy
  .on('click', () => {
    consoleTextarea.select()
    navigator.clipboard.writeText(consoleTextarea.value)
    consoleButtonCopy.title = 'Copied'
  })

exportFolder
  .addButton({ title: 'Download' })
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

/** reset */
tweakpane
  .addButton({ title: 'Reset' })
  .on('click', () => {
    Object.assign(options, copyOptions)
    colorsList.value = 0
    colorsFolder.expanded = true
    data.currentColors = mapColors(0)
    patternsList.value = patterns[0].path
    patternsFolder.expanded = true

    generateColorsInput()
    refreshPaneConsole()
    tweakpane.refresh()
    wallpaper.init(options)
  })

/** fullscreen */
declare global {
  interface Element {
    webkitRequestFullscreen?(): void
    mozRequestFullScreen?(): void
    msRequestFullscreen?(): void
  }
}

document.addEventListener('keydown', (event) => {
  if (event.code === 'F11') {
    event.preventDefault()

    if (container.requestFullscreen) {
      container.requestFullscreen()
    } else if (container.webkitRequestFullscreen) {
      container.webkitRequestFullscreen()
    } else if (container.mozRequestFullScreen) {
      container.mozRequestFullScreen()
    } else if (container.msRequestFullscreen) {
      container.msRequestFullscreen()
    }
  }
})

console.log(wallpaper)
console.log(tweakpane)
