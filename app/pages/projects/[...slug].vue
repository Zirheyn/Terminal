<script setup lang="ts">
import type { ProjectItem } from '~/composables/useProjects'

const route = useRoute()
const slug = computed(() => route.params.slug as string[])
const path = computed(() => `/projects/${slug.value.join('/')}`)

const project = await queryCollection('projects').path(path.value).first() as ProjectItem | null

if (!project) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found' })
}

const allProjects = await useProjects()
const currentIndex = allProjects.findIndex((item) => item.path === project.path)
const prevProject = computed(() => (currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null))
const nextProject = computed(() => (currentIndex > 0 ? allProjects[currentIndex - 1] : null))
const coverUrl = computed(() => project.cover || '/banner-test.jpg')

useSeoMeta({
  title: project.title,
  description: project.description,
  ogTitle: `${project.title} | Briac`,
  ogDescription: project.description
})
</script>

<template>
  <article class="blog-article-grid grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
    <div class="blog-article-main space-y-6">
      <header class="space-y-3 border-b border-zinc-800 pb-6">
        <NuxtLink
          to="/projects"
          class="button-like inline-flex items-center gap-2 border border-zinc-700 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-300 no-underline hover:border-white hover:bg-white hover:text-black"
        >
          <span>←</span>
          <span>Back to Projects</span>
        </NuxtLink>
        <img
          :src="coverUrl"
          :alt="`${project.title} cover image`"
          class="mb-4 aspect-[16/6] w-full rounded-none border border-zinc-700 object-cover"
          loading="lazy"
        >
        <p class="text-xs uppercase tracking-wide text-zinc-400">{{ project.year }}</p>
        <h1 class="text-3xl font-bold leading-tight sm:text-4xl">{{ project.title }}</h1>
        <p class="max-w-3xl text-zinc-300">{{ project.description }}</p>
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
            class="cta-live-demo rounded-none border-2 border-white bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-black no-underline"
          >
            <UIcon name="i-lucide-external-link" class="size-4" />
            Live Demo
          </UButton>
        </div>
      </header>

      <ContentRenderer :value="project" class="prose prose-invert blog-prose max-w-none" />

      <nav class="grid gap-4 border-t border-zinc-800 pt-6 sm:grid-cols-2" aria-label="Project navigation">
        <NuxtLink
          v-if="prevProject"
          :to="prevProject.path"
          class="button-like border border-zinc-700 p-4 no-underline hover:bg-white hover:text-black"
        >
          <p class="text-xs uppercase text-zinc-400">Previous</p>
          <p class="text-base font-semibold">{{ prevProject.title }}</p>
        </NuxtLink>
        <NuxtLink
          v-if="nextProject"
          :to="nextProject.path"
          class="button-like border border-zinc-700 p-4 no-underline hover:bg-white hover:text-black"
        >
          <p class="text-xs uppercase text-zinc-400">Next</p>
          <p class="text-base font-semibold">{{ nextProject.title }}</p>
        </NuxtLink>
      </nav>
    </div>

    <aside class="space-y-3 lg:sticky lg:top-24 lg:self-start">
      <p class="text-xs uppercase tracking-wide text-zinc-400">Table of contents</p>
      <ul v-if="project.body?.toc?.links?.length" class="space-y-2 border border-zinc-700 p-4 text-sm">
        <li v-for="item in project.body.toc.links" :key="item.id">
          <a :href="`#${item.id}`" class="no-underline hover:underline">{{ item.text }}</a>
        </li>
      </ul>
      <p v-else class="border border-zinc-700 p-4 text-sm text-zinc-400">No headings in this project page.</p>
    </aside>
  </article>
</template>
