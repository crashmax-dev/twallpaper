import merge from 'lodash/merge'
import cloneDeep from 'lodash/cloneDeep'
import { Pane } from 'tweakpane'
import { patterns } from './patterns'
import { colors, mapColors } from './colors'
import { TWallpaper } from '../twallpaper'
import type { TWallpaperOptions } from '../twallpaper'
import type { ListApi, InputBindingApi } from 'tweakpane'

const options: TWallpaperOptions = {
  fps: 60,
  tails: 90,
  animate: true,
  scrollAnimate: true,
  colors: colors[0].colors,
  pattern: {
    image: patterns[0].path,
    background: '#000',
    blur: 0,
    size: '420px',
    opacity: 0.5,
    mask: false
  }
}

const data = {
  container: document.querySelector('.tw-wrap')!,
  stringOptions: JSON.stringify(options, null, 2),
  copyOptions: cloneDeep(options),
  currentColors: mapColors(0),
  size: 420
}

const { container, copyOptions } = data
const wallpaper = new TWallpaper(container, options)

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
    wallpaper.updateFrametime(value)
  })

tweakpane
  .addInput(options, 'tails', {
    min: 5,
    max: 90,
    step: 1
  })
  .on('change', ({ value }) => {
    wallpaper.updateTails(value)
  })

const toggleAnimate = tweakpane
  .addInput(options, 'animate')
  .on('change', ({ value }) => {
    wallpaper.animate(value)
  })

tweakpane
  .addInput(options, 'scrollAnimate')
  .on('change', ({ value }) => {
    wallpaper.scrollAnimate(value)
  })

tweakpane
  .addButton({ title: 'Next position' })
  .on('click', () => {
    options.animate = false
    toggleAnimate.disabled = true
    toggleAnimate.refresh()
    wallpaper.animate(false)
    wallpaper.toNextPosition(() => {
      toggleAnimate.disabled = false
    })
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

    if (!options.animate) {
      options.animate = true
      toggleAnimate.refresh()
    }

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
  .addInput(options.pattern!, 'mask')
  .on('change', ({ value }) => {
    patternBlur.disabled = value!
    patternBackground.disabled = !value!
    wallpaper.updatePattern(options.pattern!)
  })

patternsFolder
  .addInput(data, 'size', {
    min: 100,
    max: 1000,
    step: 10
  })
  .on('change', ({ value }) => {
    options.pattern!.size = `${value}px`
    wallpaper.updatePattern(options.pattern!)
  })

patternsFolder
  .addInput(options.pattern!, 'opacity', {
    min: 0,
    max: 1,
    step: 0.1
  })
  .on('change', ({ value }) => {
    options.pattern!.opacity = Number(value!.toFixed(1))
    wallpaper.updatePattern(options.pattern!)
  })

const patternBlur = patternsFolder
  .addInput(options.pattern!, 'blur', {
    min: 0,
    max: 5,
    step: 0.1
  })
  .on('change', ({ value }) => {
    options.pattern!.blur = Number(value!.toFixed(2))
    wallpaper.updatePattern(options.pattern!)
  })

const patternBackground = patternsFolder
  .addInput(options.pattern!, 'background', {
    disabled: true
  })
  .on('change', () => {
    wallpaper.updatePattern(options.pattern!)
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
    options.pattern!.image = value
    wallpaper.updatePattern(options.pattern!)
  })

patternsFolder
  .on('fold', ({ expanded }) => {
    options.pattern!.image = expanded ? patterns[0].path : undefined
    wallpaper.init(options)
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
    link.download = 'twallpaper-options.json'
    link.click()
    link.remove()
  })

/** reset */
tweakpane
  .addButton({ title: 'Reset' })
  .on('click', () => {
    merge(options, copyOptions)
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
