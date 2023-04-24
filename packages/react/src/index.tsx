import React from 'react'
import { TWallpaper as TW } from 'twallpaper'
import type { PatternOptions, TWallpaperOptions } from 'twallpaper'
import 'twallpaper/css'

interface TWallpaperProps extends React.HTMLAttributes<HTMLDivElement> {
  options?: TWallpaperOptions
}

interface TWallpaperHandlers {
  animate(start?: boolean): void
  scrollAnimate(start?: boolean): void
  updateColors(colors?: string[]): void
  updateFrametime(fps: number): void
  updatePattern(pattern: PatternOptions): void
  updateTails(tails: number): void
  toNextPosition(): void
}

const TWallpaper = React.forwardRef<TWallpaperHandlers, TWallpaperProps>(
  ({ options, ...props }, ref) => {
    const container = React.useRef<HTMLDivElement>(null)
    const twallpaper = React.useRef<TW>()

    React.useImperativeHandle(ref, () => ({
      animate(start?: boolean) {
        twallpaper.current!.animate(start)
      },
      scrollAnimate(start?: boolean) {
        twallpaper.current!.scrollAnimate(start)
      },
      updateColors(colors?: string[]) {
        twallpaper.current!.updateColors(
          colors ?? twallpaper.current!.generateColors()
        )
      },
      updateFrametime(fps?: number) {
        twallpaper.current!.updateFrametime(fps)
      },
      updatePattern(pattern: PatternOptions) {
        twallpaper.current!.updatePattern(pattern)
      },
      updateTails(tails?: number) {
        twallpaper.current!.updateTails(tails)
      },
      toNextPosition(callback?: () => void) {
        twallpaper.current!.toNextPosition(callback)
      }
    }))

    React.useEffect(() => {
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
      />
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
