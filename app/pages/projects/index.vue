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
  description: 'Liste des projets personnels avec filtres par tags.',
  ogTitle: 'Projects | Briac // Terminal Portfolio',
  ogDescription: 'Liste des projets personnels avec filtres par tags.'
})
</script>

<template>
  <section class="space-y-6">
    <div class="space-y-2">
      <h1 class="text-3xl font-bold">Projects</h1>
      <p class="text-zinc-300">Filtrage client par texte et tags.</p>
    </div>

    <SearchInput v-model="search" placeholder="Filter projects..." />

    <div class="flex flex-wrap gap-2">
      <button
        class="border px-3 py-1 text-sm"
        :class="!activeTag ? 'bg-white text-black border-white' : 'border-zinc-700 hover:bg-white hover:text-black'"
        @click="activeTag = null"
      >
        All
      </button>
      <button
        v-for="tag in allTags"
        :key="tag"
        class="border px-3 py-1 text-sm"
        :class="activeTag === tag ? 'bg-white text-black border-white' : 'border-zinc-700 hover:bg-white hover:text-black'"
        @click="activeTag = tag"
      >
        #{{ tag }}
      </button>
    </div>

    <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      <ProjectCard v-for="project in filteredProjects" :key="project.path" :project="project" />
    </div>

    <p v-if="!filteredProjects.length" class="border border-zinc-700 p-4 text-zinc-400">No matching project.</p>
  </section>
</template>
