import { appendFile, copyFile, readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { description, homepage, name, version } from './package.json'

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
      async afterBuild() {
        try {
          await copyFile('src/style.css', 'dist/style.css')
          const umdFile = await readFile('dist/index.umd.js')
          await writeFile(
            'dist/index.umd.js',
            `/**\n * name: ${name}` +
              `\n * description: ${description}` +
              `\n * version: ${version}` +
              `\n * homepage: ${homepage}` +
              '\n */\n'
          )
          await appendFile('dist/index.umd.js', umdFile)
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
      name: 'TWallpaper',
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
