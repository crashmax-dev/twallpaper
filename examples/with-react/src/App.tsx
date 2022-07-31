import { useRef } from 'react'
import { TWallpaper } from '@twallpaper/react'
import type { TWallpaperHandlers } from '@twallpaper/react'
import '@twallpaper/react/css'

export function App() {
  const ref = useRef<TWallpaperHandlers>(null)

  return (
    <div>
      <div
        style={{
          position: 'absolute',
          zIndex: 1,
          display: 'flex',
          gap: '1rem'
        }}
      >
        <button onClick={() => ref.current!.updateColors()}>
          Update colors
        </button>
      </div>
      <TWallpaper ref={ref} />
    </div>
  )
}
