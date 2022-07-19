import { copyFile } from 'fs'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import banner from 'vite-plugin-banner'
import { babel } from '@rollup/plugin-babel'
import { description, homepage, name, version } from './package.json'

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
      afterBuild() {
        copyFile('src/twallpaper.css', 'dist/twallpaper.css', (err) => {
          if (err) throw err
          console.log('[vite] twallpaper.css was copied')
        })
      }
    }),
    babel({
      extensions: ['.ts'],
      babelHelpers: 'bundled',
      presets: [
        ['@babel/preset-env', {
          loose: true,
          targets: { browsers: 'defaults, ie >= 11' }
        }]
      ]
    }),
    banner(
      `/**\n * name: ${name}` +
      `\n * description: ${description}` +
      `\n * version: ${version}` +
      `\n * homepage: ${homepage}` +
      '\n */'
    )
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'TWallpaper',
      formats: ['umd', 'cjs', 'es'],
      fileName: (format) => `twallpaper.${format}.js`
    },
    rollupOptions: {
      output: {
        exports: 'named'
      }
    }
  }
})
