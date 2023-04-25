<script setup lang="ts">
import { ref } from 'vue'
import TWallpaper from '@twallpaper/vue'
import type { TWallpaperOptions } from '@twallpaper/vue'
import '@twallpaper/vue/css'

const enabled = ref(true)
const twallpaper = ref<InstanceType<typeof TWallpaper>>()
const options = ref<TWallpaperOptions>({
  colors: [
    '#222b4e',
    '#6815ff',
    '#cf98d4',
    '#0a57e1'
  ],
  fps: 60,
  tails: 60,
  pattern: {
    mask: false,
    image: 'https://twallpaper.js.org/patterns/paris.svg'
  }
})

function toggleWallpaper() {
  enabled.value = !enabled.value
}

function togglePatternMask() {
  options.value.pattern!.mask = !options.value.pattern!.mask
  twallpaper.value?.twallpaper.updatePattern(options.value.pattern!)
}
</script>

<template>
  <div class="buttons">
    <button v-on:click="toggleWallpaper">Toggle Wallpaper</button>
    <button v-on:click="togglePatternMask">Toggle Mask</button>
  </div>
  <TWallpaper
    ref="twallpaper"
    v-if="enabled"
    :options="options"
  />
</template>

<style>
body {
  background: #000;
}

.buttons {
  display: flex;
  gap: 4px;
}
</style>
