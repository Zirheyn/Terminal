<script setup lang="ts">
const projects = await useProjects()
const search = ref('')
const activeTag = ref<string | null>(null)

const allTags = computed(() => {
  return Array.from(new Set(projects.flatMap((project) => project.tags))).sort((a, b) => a.localeCompare(b))
})

const filteredProjects = computed(() => {
  const term = search.value.trim().toLowerCase()

  return projects.filter((project) => {
    const matchTerm =
      !term ||
      project.title.toLowerCase().includes(term) ||
      project.description.toLowerCase().includes(term) ||
      project.tags.join(' ').toLowerCase().includes(term)

    const matchTag = !activeTag.value || project.tags.includes(activeTag.value)

    return matchTerm && matchTag
  })
})

useSeoMeta({
  title: 'Projects',
  description: 'Selected projects with technical context, links, and filtering by stack or domain.',
  ogTitle: 'Projects | Briac',
  ogDescription: 'Selected projects with technical context, links, and filtering by stack or domain.'
})
</script>

<template>
  <section class="space-y-8">
    <div class="space-y-3 border border-zinc-700 bg-zinc-950 p-5 sm:p-7">
      <p class="section-kicker">Build Log</p>
      <h1 class="text-3xl font-black uppercase tracking-tight sm:text-5xl">Projects</h1>
      <p class="max-w-3xl text-zinc-300">
        Curated personal projects with implementation notes, stack tags, and direct access to live demos or repositories.
      </p>
    </div>

    <div class="space-y-4 border border-zinc-700 bg-zinc-950 p-5 sm:p-6">
      <SearchInput v-model="search" placeholder="Filter projects by title, description or tag..." />

      <div class="flex flex-wrap gap-2">
        <button
          class="button-like tag-filter-btn border px-3 py-1 text-sm"
          :class="!activeTag ? 'bg-white text-black border-white' : 'border-zinc-700 hover:bg-white hover:text-black'"
          @click="activeTag = null"
        >
          All
        </button>
        <button
          v-for="tag in allTags"
          :key="tag"
          class="button-like tag-filter-btn border px-3 py-1 text-sm"
          :class="activeTag === tag ? 'bg-white text-black border-white' : 'border-zinc-700 hover:bg-white hover:text-black'"
          @click="activeTag = tag"
        >
          #{{ tag }}
        </button>
      </div>

      <p class="text-xs uppercase tracking-[0.14em] text-zinc-500">
        {{ filteredProjects.length }} project<span v-if="filteredProjects.length > 1">s</span> visible
      </p>
    </div>

    <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      <ProjectCard v-for="project in filteredProjects" :key="project.path" :project="project" />
    </div>

    <p v-if="!filteredProjects.length" class="border border-zinc-700 p-4 text-zinc-400">No matching project.</p>
  </section>
</template>
