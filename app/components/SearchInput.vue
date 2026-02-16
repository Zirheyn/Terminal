<script setup lang="ts">
const model = defineModel<string>({ default: '' })

const props = defineProps<{
  placeholder?: string
}>()
</script>

<template>
  <UInput
    v-model="model"
    :placeholder="props.placeholder || 'Search...'"
    icon="i-lucide-search"
    color="neutral"
    variant="outline"
    size="lg"
    class="w-full"
    :ui="{ base: 'rounded-none border-zinc-700 bg-black text-zinc-100 placeholder:text-zinc-500' }"
  />
</template>
