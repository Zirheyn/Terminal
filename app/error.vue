<script setup lang="ts">
defineProps<{
  error: {
    statusCode?: number
    statusMessage?: string
    message?: string
  }
}>()
</script>

<template>
  <div class="mx-auto my-16 max-w-2xl border border-zinc-700 bg-zinc-950 p-8 text-center">
    <p class="mb-2 text-xs uppercase tracking-[0.2em] text-zinc-400">system message</p>
    <h1 class="mb-3 text-4xl font-bold">{{ error.statusCode || 500 }}</h1>
    <p class="mb-6 text-zinc-300">{{ error.statusMessage || error.message || 'Unknown error' }}</p>
    <UButton to="/" color="neutral" variant="outline" class="button-like rounded-none border border-zinc-500 hover:bg-white hover:text-black">
      Return Home
    </UButton>
  </div>
</template>
