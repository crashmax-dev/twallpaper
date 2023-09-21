import { copyFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
      async afterBuild() {
        try {
          await copyFile('src/style.css', 'dist/style.css')
        } catch (err) {
          console.log(err)
          process.exit(1)
        }
      }
    })
  ],
  build: {
    target: 'esnext',
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'TWallpaperWebGL',
      formats: [
        'cjs',
        'es',
        'umd'
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
