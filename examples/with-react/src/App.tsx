import { useRef } from 'react'
import { TWallpaper } from '@twallpaper/react'
import type { TWallpaperHandlers } from '@twallpaper/react'
import '@twallpaper/react/css'

export function App() {
  const ref = useRef<TWallpaperHandlers>(null)
  return (
    <TWallpaper
      ref={ref}
      options={{
        colors: [
          '#dbddbb',
          '#6ba587',
          '#d5d88d',
          '#88b884'
        ]
      }}
    />
  )
}
