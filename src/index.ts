import { Pane } from 'tweakpane'
import TelegramWallpaper from './telegram-wallpaper'
import type { ListApi } from 'tweakpane'
import type { TWOptions } from './telegram-wallpaper'

const colors = {
  'Default': ['#dbddbb', '#6ba587', '#d5d88d', '#88b884'],
  'Amethyst': ['#4f5bd5', '#962fbf', '#dd6cb9', '#fec496'],
  'Calico': ['#baa161', '#ddb56d', '#cea668', '#faf4d2'],
  'Cashmere': ['#ffe7b2', '#e2c0ff', '#ffc3b2'],
  'Cavern Pink': ['#ecd893', '#e5a1d0', '#edd594', '#d1a3e2'],
  'Cheerfulness': ['#efd359', '#e984d8', '#ac86ed', '#40cdde'],
  'Cold Purple': ['#6c8cd4', '#d4a7c9', '#b2b1ee'],
  'Curious Blue': ['#527bdd', '#009fdd', '#a4dbff'],
  'France': ['#fbd9e6', '#fb9ae5', '#d5f7ff', '#73caff'],
  'Light Wisteria': ['#b493e6', '#eab9d9', '#8376c2', '#e4b2ea'],
  'Malibu': ['#679ced', '#e39fea', '#888dec', '#8adbf2'],
  'Monte Carlo': ['#85d685', '#67a3f2', '#8fe1d6', '#dceb92'],
  'Perfume': ['#b9e2ff', '#eccbff', '#a2b4ff', '#daeacb'],
  'Periwinkle Gray': ['#efb7dc', '#c6b1ef', '#b1e9ea', '#97beeb'],
  'Pine Glade': ['#fbe37d', '#336f55', '#fff5c5', '#7fa381'],
  'Santa': ['#384F2F', '#BF141B', '#135E35', '#7A3226'],
  'Spindle': ['#b2e3dd', '#bbead5', '#9fb0ea', '#b0cdeb'],
  'Viola': ['#f7dd6d', '#e96caf', '#edac4c', '#a464f4'],
  'Wewak': ['#e8c06e', '#f29ebf', '#f0e486', '#eaa36e'],
  'Wild Willow': ['#f0c07a', '#afd677', '#e4d573', '#7fc289']
}

const patternPath = location.href + 'patterns/'
const patterns = [
  {
    text: 'Animals',
    path: patternPath + 'animals.svg'
  },
  {
    text: 'Astronaut cats',
    path: patternPath + 'astronaut_cats.svg'
  },
  {
    text: 'Beach',
    path: patternPath + 'beach.svg'
  },
  {
    text: 'Cats and Dogs',
    path: patternPath + 'cats_and_dogs.svg'
  },
  {
    text: 'Christmas',
    path: patternPath + 'christmas.svg'
  },
  {
    text: 'Fantasy',
    path: patternPath + 'fantasy.svg'
  },
  {
    text: 'Late night delight',
    path: patternPath + 'late_night_delight.svg'
  },
  {
    text: 'Magic',
    path: patternPath + 'magic.svg'
  },
  {
    text: 'Math',
    path: patternPath + 'math.svg'
  },
  {
    text: 'Paris',
    path: patternPath + 'paris.svg'
  },
  {
    text: 'Games',
    path: patternPath + 'games.svg'
  },
  {
    text: 'Snowflakes',
    path: patternPath + 'snowflakes.svg'
  },
  {
    text: 'Space',
    path: patternPath + 'space.svg'
  },
  {
    text: 'Star Wars',
    path: patternPath + 'star_wars.svg'
  },
  {
    text: 'Sweets',
    path: patternPath + 'sweets.svg'
  },
  {
    text: 'Tattoos',
    path: patternPath + 'tattoos.svg'
  },
  {
    text: 'Underwater World',
    path: patternPath + 'underwater_world.svg'
  },
  {
    text: 'Unicorns',
    path: patternPath + 'unicorn.svg'
  },
  {
    text: 'Zoo',
    path: patternPath + 'zoo.svg'
  }
]

const container = document.querySelector('.background_wrap')!

const options: TWOptions = {
  fps: 60,
  blur: 0,
  opacity: 0.5,
  animate: true,
  scrollAnimate: true,
  colors: colors.Default,
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
    value: 'Default',
    options: Object.keys(colors).map((text) => {
      return {
        text,
        value: text
      }
    })
  }) as ListApi<keyof typeof colors>

colorsList
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

const patternFolder = tweakpane
  .addFolder({
    title: 'Pattern'
  })

patternFolder
  .on('fold', ({ expanded }) => {
    options.pattern = expanded ? patterns[0].path : undefined
    wallpaper.init(options)
  })

patternFolder
  .addInput(options, 'blur', {
    min: 0,
    max: 5,
    step: 0.1
  })
  .on('change', ({ value }) => {
    options.blur = Number(value!.toFixed(1))
    wallpaper.updateBlur(value!)
  })

patternFolder
  .addInput(options, 'opacity', {
    min: 0,
    max: 1,
    step: 0.1
  })
  .on('change', ({ value }) => {
    options.opacity = Number(value!.toFixed(1))
    wallpaper.updateOpacity(value!)
  })

const patternsList = patternFolder
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
    patternFolder.expanded = true
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
