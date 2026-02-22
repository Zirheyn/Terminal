<script setup lang="ts">
const search = ref('')
const activeTag = ref<string | null>(null)
const posts = await usePosts()

const allTags = computed(() => {
  return Array.from(new Set(posts.flatMap((post) => post.tags))).sort((a, b) => a.localeCompare(b))
})

const filteredPosts = computed(() => {
  const term = search.value.trim().toLowerCase()

  return posts.filter((post) => {
    const matchTerm =
      !term || (
      post.title.toLowerCase().includes(term) ||
      post.description.toLowerCase().includes(term) ||
      post.tags.join(' ').toLowerCase().includes(term)
    )

    const matchTag = !activeTag.value || post.tags.includes(activeTag.value)

    return matchTerm && matchTag
  })
})

useSeoMeta({
  title: 'Blog',
  description: 'Technical articles on security, tooling, backend engineering, and practical implementation notes.',
  ogTitle: 'Blog | Briac',
  ogDescription: 'Technical articles on security, tooling, backend engineering, and practical implementation notes.'
})
</script>

<template>
  <section class="space-y-8">
    <div class="space-y-3 border border-zinc-700 bg-zinc-950 p-5 sm:p-7">
      <p class="section-kicker">Knowledge Base</p>
      <h1 class="text-3xl font-black uppercase tracking-tight sm:text-5xl">Blog</h1>
      <p class="max-w-3xl text-zinc-300">
        Technical write-ups focused on cybersecurity, software engineering, architecture, and practical tooling.
      </p>
    </div>

    <div class="space-y-4 border border-zinc-700 bg-zinc-950 p-5 sm:p-6">
      <SearchInput v-model="search" placeholder="Filter articles by title, description or tag..." />
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
        {{ filteredPosts.length }} article<span v-if="filteredPosts.length > 1">s</span> visible
      </p>
    </div>

    <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      <PostCard v-for="post in filteredPosts" :key="post.path" :post="post" />
    </div>

    <p v-if="!filteredPosts.length" class="border border-zinc-700 p-4 text-zinc-400">
      No matching articles found.
    </p>
  </section>
</template>
