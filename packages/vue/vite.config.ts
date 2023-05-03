import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import { description, homepage, name, version } from './package.json'

export default defineConfig({
  plugins: [vue()],
  esbuild: {
    banner:
      `/**\n * name: ${name}` +
      `\n * description: ${description}` +
      `\n * version: ${version}` +
      `\n * homepage: ${homepage}` +
      '\n */'
  },
  build: {
    target: 'esnext',
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'TWallpaper',
      formats: ['es', 'cjs'],
      fileName: 'index'
    },
    rollupOptions: {
      external: ['vue', 'twallpaper'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
          twallpaper: 'TWallpaper'
        }
      }
    }
  }
})
