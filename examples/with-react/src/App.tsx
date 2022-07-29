import { TWallpaper } from 'twallpaper'
import 'twallpaper/css'
import { useEffect, useRef } from 'react'

export function App() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wallpaper = new TWallpaper(ref.current!)
    wallpaper.init({ colors: wallpaper.generateColors() })

    return () => {
      wallpaper.dispose()
    }
  }, [])

  return <div ref={ref}></div>
}
