import React from 'react'
import { TWallpaper as TW } from 'twallpaper'
import type { PatternOptions, TWallpaperOptions } from 'twallpaper'
import 'twallpaper/css'

interface TWallpaperProps extends React.HTMLAttributes<HTMLDivElement> {
  options: TWallpaperOptions
}

interface TWallpaperHandlers {
  animate(start?: boolean): void
  scrollAnimate(start?: boolean): void
  updateColors(colors: string[]): void
  updateFrametime(fps: number): void
  updatePattern(pattern: PatternOptions): void
  updateTails(tails: number): void
  toNextPosition(onNext?: () => void): void
}

const TWallpaper = React.forwardRef<TWallpaperHandlers, TWallpaperProps>(
  ({ options, ...props }, ref) => {
    const container = React.useRef<HTMLDivElement>(null)
    const twallpaper = React.useRef<TW>()

    React.useImperativeHandle(ref, () => ({
      animate(start) {
        twallpaper.current!.animate(start)
      },
      scrollAnimate(start) {
        twallpaper.current!.scrollAnimate(start)
      },
      updateColors(colors) {
        twallpaper.current!.updateColors(colors)
      },
      updateFrametime(fps) {
        twallpaper.current!.updateFrametime(fps)
      },
      updatePattern(pattern) {
        twallpaper.current!.updatePattern(pattern)
      },
      updateTails(tails) {
        twallpaper.current!.updateTails(tails)
      },
      toNextPosition(onNext) {
        twallpaper.current!.toNextPosition(onNext)
      }
    }))

    React.useEffect(() => {
      if (!twallpaper.current) {
        twallpaper.current = new TW(container.current!)
      }

      twallpaper.current.init(options)

      return () => {
        twallpaper.current!.dispose()
      }
    }, [])

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
