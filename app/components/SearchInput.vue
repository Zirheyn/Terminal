<script setup lang="ts">
const model = defineModel<string>({ default: '' })

const props = defineProps<{
  placeholder?: string
}>()
</script>

<template>
  <label class="relative block w-full">
    <span class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">
      <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>
    </span>

    <input
      v-model="model"
      type="search"
      :placeholder="props.placeholder || 'Search...'"
      class="search-input-field h-11 w-full rounded-none border border-zinc-700 bg-black pl-10 pr-3 text-sm text-zinc-100 outline-none shadow-none transition-colors placeholder:text-zinc-500 focus:border-white focus:outline-none focus-visible:outline-none focus-visible:shadow-none"
    >
  </label>
</template>
