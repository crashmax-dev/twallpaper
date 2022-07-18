import { useEffect, useRef } from 'react'
import { TWallpaper } from 'twallpaper'
import 'twallpaper/dist/twallpaper.css'

export function App() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wallpaper = new TWallpaper(ref.current)
    wallpaper.init({ colors: wallpaper.generateColors() })

    return () => {
      wallpaper.dispose()
    }
  }, [])

  return <div ref={ref}></div>
}
