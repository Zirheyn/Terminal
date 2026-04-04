<template>
  <div class="waline-section mt-12 border-t border-zinc-800 pt-8">
    <div id="waline-widget"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, watch } from 'vue'
import { init } from '@waline/client'
import '@waline/client/waline.css'

const props = defineProps<{ path: string }>()

const config = useRuntimeConfig()
const serverURL = config.public.walineServerUrl || 'https://waline-hello-world-six.vercel.app/'

let walineInstance: any = null

const setupWaline = () => {
  if (!serverURL) {
    console.warn('[Comments] Waline server URL is not configured.')
    return
  }

  walineInstance = init({
    el: '#waline-widget',
    serverURL,
    path: props.path,
    dark: true
  })
}

onMounted(() => {
  setupWaline()
})

watch(() => props.path, () => {
  if (walineInstance) {
    walineInstance.destroy()
    setupWaline()
  }
})

onUnmounted(() => {
  if (walineInstance) walineInstance.destroy()
})
</script>

<style>
:root {
  --waline-theme-color: #ffffff;
}
</style>
