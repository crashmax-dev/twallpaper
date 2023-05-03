import { TWallpaper } from 'twallpaper'
import 'twallpaper/css'

const container = document.querySelector('.tw-wrap')
const wallpaper = new TWallpaper(container, {
  colors: [
    '#dbddbb',
    '#6ba587',
    '#d5d88d',
    '#88b884'
  ]
})
wallpaper.init()
