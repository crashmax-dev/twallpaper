import { useRef } from 'react'
import { TWallpaper } from './TWallpaper'
import type { TWallpaperHandlers } from './TWallpaper'

export function App() {
  const ref = useRef<TWallpaperHandlers>(null)

  return (
    <div>
      <button
        style={{ position: 'absolute', zIndex: 1 }}
        onClick={() => ref.current!.toNextPosition()}
      >toNextPosition</button>
      <TWallpaper ref={ref} />
    </div>
  )
}
