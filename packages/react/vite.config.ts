import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { description, homepage, name, version } from '../../package.json'

export default defineConfig({
  plugins: [
    react(),
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
      entry: resolve(__dirname, 'src/index.tsx'),
      name: 'TWallpaper',
      formats: [
        'es',
        'cjs',
        'umd'
      ],
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'twallpaper'],
      output: {
        exports: 'named',
        globals: {
          react: 'React',
          'twallpaper': 'twallpaper'
        }
      }
    }
  }
})
