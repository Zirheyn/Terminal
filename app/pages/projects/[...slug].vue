<script setup lang="ts">
import type { ProjectItem } from '~/composables/useProjects'

const route = useRoute()
const slug = computed(() => route.params.slug as string[])
const path = computed(() => `/projects/${slug.value.join('/')}`)

const project = await queryCollection('projects').path(path.value).first() as ProjectItem | null

if (!project) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found' })
}

useSeoMeta({
  title: project.title,
  description: project.description,
  ogTitle: `${project.title} | Briac // Terminal Portfolio`,
  ogDescription: project.description
})
</script>

<template>
  <article class="space-y-6">
    <header class="space-y-3 border-b border-zinc-800 pb-6">
      <p class="text-xs uppercase tracking-wide text-zinc-400">{{ project.year }}</p>
      <h1 class="text-4xl font-bold">{{ project.title }}</h1>
      <p class="text-zinc-300">{{ project.description }}</p>
      <div class="flex flex-wrap gap-2">
        <TagPill v-for="tag in project.tags" :key="tag" :label="tag" />
      </div>
      <div class="flex flex-wrap gap-3 pt-2">
        <UButton
          v-if="project.links?.repo"
          :to="project.links.repo"
          target="_blank"
          color="neutral"
          variant="outline"
          class="button-like rounded-none border border-zinc-500 hover:bg-white hover:text-black"
        >
          Repository
        </UButton>
        <UButton
          v-if="project.links?.demo"
          :to="project.links.demo"
          target="_blank"
          color="neutral"
          variant="outline"
          class="button-like rounded-none border border-zinc-500 hover:bg-white hover:text-black"
        >
          Live Demo
        </UButton>
      </div>
    </header>

    <ContentRenderer :value="project" class="prose prose-invert max-w-none" />
  </article>
</template>
