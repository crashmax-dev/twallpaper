import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue()],
  build: {
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
