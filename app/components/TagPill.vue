<script setup lang="ts">
defineProps<{
  label: string
}>()
</script>

<template>
  <span class="inline-flex border border-zinc-600 bg-zinc-900 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-300">
    #{{ label }}
  </span>
</template>
