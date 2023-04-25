<script setup lang="ts">
import { TWallpaper } from 'twallpaper'
import type { TWallpaperOptions } from 'twallpaper'
import 'twallpaper/css'
import { PropType, Ref, defineExpose, onMounted, onUnmounted, ref } from 'vue'

const props = defineProps({
  options: {
    type: Object as PropType<TWallpaperOptions>,
    required: true
  }
})

const container = ref<HTMLElement | null>(null)
const twallpaper = new TWallpaper()

defineExpose<{
  container: Ref<HTMLElement | null>
  twallpaper: TWallpaper
}>({
  container,
  twallpaper
})

onMounted(() => {
  twallpaper.init(props.options, container.value!)
})

onUnmounted(() => {
  twallpaper.dispose()
})
</script>

<template>
  <div ref="container"></div>
</template>
