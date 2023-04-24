import { TWallpaper } from 'twallpaper'
import 'twallpaper/css'

const container = document.querySelector('.tw-wrap')
const wallpaper = new TWallpaper(container, {
  /* options */
})
wallpaper.init()
