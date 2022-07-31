import type { PatternOptions, TWallpaperOptions } from 'twallpaper'
import { TWallpaper as TW } from 'twallpaper'
import 'twallpaper/css'
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import type { HTMLAttributes } from 'react'

interface TWallpaperProps extends HTMLAttributes<HTMLDivElement> {
  options?: TWallpaperOptions
}

interface TWallpaperHandlers {
  updateColors(colors: string[]): void
  updateFrametime(fps: number): void
  updatePattern(pattern: PatternOptions): void
  updateTails(tails: number): void
  toNextPosition(): void
}

const TWallpaper = forwardRef<TWallpaperHandlers, TWallpaperProps>(
  ({ options, ...props }, ref) => {
    const container = useRef<HTMLDivElement>(null)
    const twallpaper = useRef<TW>()

    useImperativeHandle(ref, () => ({
      updateColors(colors: string[]) {
        twallpaper.current!.updateColors(colors)
      },
      updateFrametime(fps: number) {
        twallpaper.current!.updateFrametime(fps)
      },
      updatePattern(pattern: PatternOptions) {
        twallpaper.current!.updatePattern(pattern)
      },
      updateTails(tails: number) {
        twallpaper.current!.updateTails(tails)
      },
      toNextPosition(callback?: () => void) {
        twallpaper.current!.toNextPosition(callback)
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

    return (
      <div
        {...props}
        ref={container}
      ></div>
    )
  }
)

export { TWallpaper }
export default TWallpaper
export type {
  TWallpaperProps,
  TWallpaperHandlers,
  TWallpaperOptions,
  PatternOptions
}
