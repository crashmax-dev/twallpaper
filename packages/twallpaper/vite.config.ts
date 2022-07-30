import { copyFile } from 'fs'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import banner from 'vite-plugin-banner'
import dts from 'vite-plugin-dts'
import { babel } from '@rollup/plugin-babel'
import { description, homepage, name, version } from '../../package.json'

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
      afterBuild() {
        copyFile('src/style.css', 'dist/style.css', (err) => {
          if (err) throw err
          console.log('[vite] style.css was copied')
        })
      }
    }),
    babel({
      extensions: ['.ts'],
      babelHelpers: 'bundled',
      presets: [
        [
          '@babel/preset-env',
          {
            loose: true,
            targets: { browsers: 'defaults, ie >= 11' }
          }
        ]
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
      formats: [
        'umd',
        'cjs',
        'es'
      ],
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      output: {
        exports: 'named'
      }
    }
  }
})
