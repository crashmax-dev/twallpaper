import { TWallpaper as TW } from 'twallpaper'
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import type { TWallpaperOptions } from 'twallpaper'
import 'twallpaper/css'

export interface TWallpaperProps {
  options?: TWallpaperOptions
}

export interface TWallpaperHandlers {
  toNextPosition: () => void
}

const TWallpaper = forwardRef<TWallpaperHandlers, TWallpaperProps>(
  ({ options }, ref) => {
    const container = useRef<HTMLDivElement>(null)
    const twallpaper = useRef<TW>()

    useImperativeHandle(ref, () => ({
      toNextPosition() {
        twallpaper.current!.toNextPosition()
      }
    }))

    useEffect(() => {
      if (!twallpaper.current) {
        twallpaper.current = new TW(container.current!)
      }

      twallpaper.current.init({
        colors: twallpaper.current.generateColors(),
        ...options
      })

      return () => {
        twallpaper.current!.dispose()
      }
    }, [options])

    return <div ref={container}></div>
  }
)

export { TWallpaper }
export default TWallpaper
export type { TWallpaperOptions }
