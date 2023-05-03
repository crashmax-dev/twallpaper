import { TWallpaper } from '@twallpaper/react'
import '@twallpaper/react/css'

export function App() {
  return (
    <TWallpaper
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
