<script setup lang="ts">
defineProps<{
  project: {
    path: string
    title: string
    description: string
    tags?: string[]
    year: number
    cover?: string
  }
}>()
</script>

<template>
  <article class="brutal-card group flex h-full flex-col p-3">
    <NuxtLink :to="project.path" class="mb-3 block no-underline">
      <img
        :src="project.cover || '/banner-test.jpg'"
        :alt="`${project.title} banner`"
        class="h-24 w-full border border-zinc-700 object-cover"
        loading="lazy"
      >
    </NuxtLink>

    <p class="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-400">{{ project.year }}</p>

    <h3 class="mb-2 text-lg font-bold uppercase leading-tight">
      <NuxtLink :to="project.path" class="no-underline">
        {{ project.title }}
      </NuxtLink>
    </h3>

    <p class="mb-4 text-sm leading-6 text-zinc-300">{{ project.description }}</p>

    <div class="mt-auto flex items-end justify-between gap-3">
      <div class="flex flex-wrap gap-2">
        <TagPill v-for="tag in project.tags || []" :key="tag" :label="tag" />
      </div>
      <NuxtLink :to="project.path" class="text-xs font-bold uppercase tracking-[0.15em] text-zinc-500 no-underline transition group-hover:text-white">
        inspect &gt;
      </NuxtLink>
    </div>
  </article>
</template>
