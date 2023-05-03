import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { description, homepage, name, version } from './package.json'

export default defineConfig({
  plugins: [react({ jsxRuntime: 'classic' }), dts({ insertTypesEntry: true })],
  esbuild: {
    banner:
      `/**\n * name: ${name}` +
      `\n * description: ${description}` +
      `\n * version: ${version}` +
      `\n * homepage: ${homepage}` +
      '\n */' +
      '\n"use client";'
  },
  build: {
    target: 'esnext',
    lib: {
      entry: resolve(__dirname, 'src/index.tsx'),
      name: 'TWallpaper',
      formats: ['es', 'cjs'],
      fileName: 'index'
    },
    rollupOptions: {
      external: ['react', 'twallpaper'],
      output: {
        exports: 'named',
        globals: {
          react: 'React',
          twallpaper: 'twallpaper'
        }
      }
    }
  }
})
